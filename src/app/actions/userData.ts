'use server';

import { executeSql } from '@/lib/sql';
import {
  AuthData,
  emptyNotifications,
  NotificationPreferences,
  NotificationTypes,
  UserData,
} from '@/types/User.type';

export async function getUserData({
  userId,
  name,
  email,
}: AuthData): Promise<UserData | null> {
  try {
    const {
      rows: [userData],
    } = await executeSql(
      (c) =>
        c.query`
          WITH tmp_guest_cards AS (
            SELECT
              COALESCE(u1.amplify_id, u2.amplify_id) as amplify_id,
              i.guest as user_id,
              i.invite_id,
              u_sender.email as inviter_email,
              i.card as card_id,
              i.status,
              pci.card_image_url,
              pci.dashboard_slug,
              pi.player_first_name || ' ' || pi.player_last_name AS name,
              pti.player_number AS number,
              t.team_name AS team,
              c.name AS club,
              c.logo_url AS club_logo
            FROM public.invitations i
            LEFT JOIN public.player_card_images pci ON pci.card_image_id = i.card
            LEFT JOIN public.users u1 ON (u1.email = i.guest_email AND i.status <> 'accepted')
            LEFT JOIN public.users u2 ON (u2.user_id = i.guest AND i.status = 'accepted')
            LEFT JOIN public.users u_sender ON u_sender.user_id = pci.owner
            LEFT JOIN public.players_team_info pti ON pti.player_id = pci.player_id
            LEFT JOIN public.player_identities pi ON pi.id = pti.player_identity
            LEFT JOIN public.teams t ON t.team_id = pti.team_id
            LEFT JOIN public.clubs c ON c.club_id = pti.club_id
            WHERE u1.amplify_id = ${userId}
              OR u2.amplify_id = ${userId}
              AND i.invite_type <> 'set_owner'
          ), tmp_guest_cards_agg AS (
            SELECT
              tgc.amplify_id,
              JSON_AGG(JSON_BUILD_OBJECT('invite_id', tgc.invite_id, 'inviter_email', tgc.inviter_email, 'status', tgc.status, 'card_id', tgc.card_id, 'card_image_url', tgc.card_image_url, 'dashboard_slug', tgc.dashboard_slug, 'name', tgc.name, 'number', tgc.number, 'team', tgc.team, 'club', tgc.club, 'club_logo', tgc.club_logo)) AS guest_cards
            FROM tmp_guest_cards tgc
            GROUP BY tgc.amplify_id
          ), tmp_owned_cards_agg AS (
            SELECT
              u.amplify_id,
              JSON_AGG(JSON_BUILD_OBJECT('card_id', pci.card_image_id, 'card_image_url', pci.card_image_url, 'dashboard_slug', pci.dashboard_slug, 'name', pi.player_first_name || ' ' || pi.player_last_name, 'number', pti.player_number, 'team', t.team_name, 'club', c.name, 'club_logo', c.logo_url)) AS owned_cards
            FROM public.users u
            RIGHT JOIN public.player_card_images pci ON u.user_id = pci.owner
            RIGHT JOIN public.players_team_info pti ON pti.player_id = pci.player_id
            RIGHT JOIN public.player_identities pi ON pi.id = pti.player_identity
            RIGHT JOIN public.teams t ON t.team_id = pti.team_id
            RIGHT JOIN public.clubs c ON c.club_id = pti.club_id
            WHERE u.amplify_id = ${userId}
            GROUP BY u.amplify_id
          ), tmp_notification_preferences AS (
            SELECT
              u.amplify_id,
              u.init_notifications,
              pudr.delete_status,
              ARRAY_AGG(nt.name :: TEXT) AS notifications_enabled
            FROM public.users u
            LEFT JOIN public.many_users_has_many_notification_types mtm ON u.user_id = mtm.user_id_users
            LEFT JOIN public.notification_types nt ON nt.type_id = mtm.type_id_notification_types
            LEFT JOIN public.purge_user_data_requests pudr ON pudr.amplify_id = u.amplify_id
            WHERE u.amplify_id = ${userId}
            GROUP BY u.amplify_id, u.init_notifications, pudr.delete_status
          ), tmp_invites_agg AS (
            SELECT
              u.amplify_id,
              JSON_AGG(JSON_BUILD_OBJECT(
              'invite_id', i.invite_id,
              'inviter_email', u.email,
              'guest_email', i.guest_email,
              'guest_id', i.guest,
              'invite_status', i.status,
              'card_image_id', pci.card_image_id,
              'card_image_url', pci.card_image_url
              )) AS invites
            FROM public.invitations i
            JOIN public.player_card_images pci ON pci.card_image_id = i.card
            LEFT JOIN public.users u ON u.user_id = pci.owner
            WHERE u.amplify_id = ${userId}
            GROUP BY u.amplify_id
          )
          SELECT
            tnp.amplify_id,
            tnp.init_notifications,
            tnp.delete_status,
            tnp.notifications_enabled,
            toca.owned_cards,
            tgca.guest_cards,
            tia.invites
          FROM tmp_notification_preferences tnp
          LEFT JOIN tmp_guest_cards_agg tgca ON tgca.amplify_id = tnp.amplify_id
          LEFT JOIN tmp_owned_cards_agg toca ON toca.amplify_id = tnp.amplify_id
          LEFT JOIN tmp_invites_agg tia ON tia.amplify_id = tnp.amplify_id;
        `,
    );
    if (!userData) {
      return null;
    }

    return {
      amplify_id: userId,
      name: name as string,
      email: email as string,
      init_notifications: userData.init_notifications,
      notifications:
        userData.notifications_enabled.length > 0
          ? transformNotificationPreferences(userData.notifications_enabled)
          : emptyNotifications,
      user_delete_status: userData.delete_status,
      owned_cards: userData.owned_cards,
      guest_cards: userData.guest_cards,
      invites: userData.invites,
    };
  } catch (error) {
    console.error('getUserData error: %s', error);
    return null;
  }
}

function transformNotificationPreferences(dataArray: NotificationTypes[]) {
  const tmp = { ...emptyNotifications };
  dataArray.map((item: keyof NotificationPreferences) => {
    tmp[item] = true;
  });
  return tmp;
}
