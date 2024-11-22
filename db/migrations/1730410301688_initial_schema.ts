import type { MigrationBuilder, Name } from 'node-pg-migrate';

/**
 * Initialize the schema.
 */
export async function up(pgm: MigrationBuilder) {
  // We might need to add stuff for us_east_1_user. Also we may want to re-add
  // column comments.

  createTypes(pgm);
  createTables(pgm);
  createFunctions(pgm);
  createTriggers(pgm);
  addComments(pgm);
  setPermissions(pgm);
}

/**
 * Delete everything.
 */
export function down(pgm: MigrationBuilder) {
  // Call the create functions and transform CREATE X into DROP X
  const calls: (() => void)[] = [];

  createTypes({
    createType(typeName) {
      calls.push(() => pgm.dropType(typeName, { cascade: true }));
    },
  });

  createTables({
    createTable(tableName) {
      calls.push(() => pgm.dropTable(tableName, { cascade: true }));
    },
    addConstraint() {},
    addIndex() {},
  });

  createFunctions({
    createFunction(name, params) {
      calls.push(() => pgm.dropFunction(name, params, { cascade: true }));
    },
  });

  createTriggers({
    createTrigger(...[table, name]) {
      calls.push(() => pgm.dropTrigger(table, name, { cascade: true }));
    },
  });

  // Execute the DROP calls in reverse order (because dependencies)
  calls.reverse().forEach((x) => x());
}

function createTypes(pgm: Pick<MigrationBuilder, 'createType'>) {
  pgm.createType('event_enum', [
    'aerial_clearance_success',
    'aerial_clearance_fail',
    'aerial_duel_success',
    'aerial_duel_fail',
    'assist',
    'block',
    'catch',
    'clearance',
    'poor_ball_handling',
    'cross_success',
    'cross_fail',
    'foul_won',
    'goal_kick_success',
    'goal_kick_fail',
    'goal_conceded',
    'goal_scored',
    'ground_duel_success',
    'ground_duel_fail',
    'interception',
    'intervention',
    'key_pass',
    'long_pass_success',
    'long_pass_fail',
    'middle_pass_success',
    'middle_pass_fail',
    'mistake_loss',
    'pass_forward_success',
    'pass_forward_fail',
    'pass_final_third_success',
    'pass_final_third_fail',
    'pass_success',
    'pass_fail',
    'punch',
    'red_card',
    'shot_on_target',
    'shot_off_target',
    'shot_on_post',
    'shot_outside_penalty_area',
    'tackle_success',
    'tackle_fail',
    'dribble_success',
    'dribble_fail',
    'yellow_card',
    'is_goalkeeper',
  ]);

  pgm.createType('gender', ['male', 'female', 'x', 'boy', 'girl']);

  pgm.createType('interaction_enum', [
    'aerial_clearance_success',
    'aerial_clearance_fail',
    'aerial_duel_success',
    'aerial_duel_fail',
    'assist',
    'block',
    'catch',
    'clearance',
    'poor_ball_handling',
    'cross_success',
    'cross_fail',
    'foul_won',
    'goal_kick_success',
    'goal_kick_fail',
    'goal_conceded',
    'goal_scored',
    'ground_duel_success',
    'ground_duel_fail',
    'interception',
    'intervention',
    'key_pass',
    'long_pass_success',
    'long_pass_fail',
    'middle_pass_success',
    'middle_pass_fail',
    'mistake_loss',
    'pass_forward_success',
    'pass_forward_fail',
    'pass_final_third_success',
    'pass_final_third_fail',
    'pass_success',
    'pass_fail',
    'punch',
    'red_card',
    'shot_on_target',
    'shot_off_target',
    'shot_on_post',
    'shot_outside_penalty_area',
    'tackle_success',
    'tackle_fail',
    'dribble_success',
    'dribble_fail',
    'yellow_card',
    'is_goalkeeper',
  ]);

  pgm.createType('match_outcome', ['home_team_win', 'away_team_win', 'draw']);

  pgm.createType('notification_mode_enum', ['email', 'phone']);

  pgm.createType('status_type', ['pending', 'accepted', 'revoked', 'expired']);
}

function createTables(
  pgm: Pick<MigrationBuilder, 'createTable' | 'addIndex' | 'addConstraint'>,
) {
  const lit = (value: string) => ({ value, literal: true }) as const;

  pgm.createTable('users', {
    user_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    email: { type: 'text' },
    name: { type: 'text' },
    amplify_id: { type: 'text' },
    init_notifications: {
      type: 'boolean',
      default: false,
    },
  });

  pgm.createTable('coaches', {
    coach_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    first_name: { type: 'character varying(255)', notNull: true },
    last_name: { type: 'character varying(255)' },
  });

  pgm.createTable('player_identities', {
    id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    player_first_name: { type: 'character varying(255)' },
    player_last_name: { type: 'character varying(255)' },
    date_of_birth: { type: 'date' },
    parent1_first_name: { type: 'character varying(255)' },
    parent2_first_name: { type: 'character varying(255)' },
    parent1_email: { type: 'character varying(255)' },
    parent2_email: { type: 'character varying(255)' },
    gender: { type: 'gender' },
  });

  pgm.createTable('clubs', {
    club_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    name: { type: 'character varying(255)', notNull: true },
    location: { type: 'character varying(255)', notNull: true },
    logo_url: { type: 'text' },
    history_description: { type: 'text' },
  });

  pgm.createTable('league', {
    league_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    league_name: { type: 'character varying(255)' },
    league_acronym: { type: 'character varying(20)' },
    logo_url: { type: 'text' },
    description: { type: 'text' },
  });

  pgm.createTable(
    'teams',
    {
      team_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      club: { type: 'uuid' },
      age_group: { type: 'character varying(50)' },
      league: { type: 'uuid' },
      team_name: { type: 'character varying(255)' },
      head_coach: { type: 'uuid' },
    },
    {
      constraints: {
        unique: [['team_name', 'age_group']],
        foreignKeys: [
          {
            columns: 'club',
            references: 'clubs(club_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columns: 'head_coach',
            references: 'coaches(coach_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columns: 'league',
            references: 'league(league_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      },
    },
  );

  pgm.createTable(
    'players_team_info',
    {
      player_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      club_id: { type: 'uuid' },
      is_active: { type: 'boolean' },
      latest_position: { type: 'character varying' },
      player_number: { type: 'text' },
      team_id: { type: 'uuid' },
      player_identity: { type: 'uuid' },
      positions: { type: 'character varying(50)[]' },
      player_avatar_url: { type: 'text' },
      player_bio: { type: 'text' },
    },
    {
      constraints: {
        foreignKeys: [
          {
            columns: 'club_id',
            references: 'clubs(club_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columns: 'player_identity',
            references: 'player_identities(id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columns: 'team_id',
            references: 'teams(team_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      },
    },
  );

  pgm.createTable(
    'competitions',
    {
      competition_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      name: { type: 'character varying(255)', notNull: true },
      type: { type: 'character varying(50)' },
      start_date: { type: 'date' },
      end_date: { type: 'date' },
      league: { type: 'uuid' },
      playoff_start_date: { type: 'date' },
      playoff_end_date: { type: 'date' },
    },
    {
      constraints: {
        foreignKeys: [
          {
            columns: 'league',
            references: 'league(league_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      },
    },
  );

  pgm.createTable(
    'player_card_images',
    {
      card_image_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      player_id: { type: 'uuid' },
      competition_id: { type: 'uuid' },
      card_image_url: { type: 'text' },
      dashboard_slug: { type: 'character varying(255)' },
      owner: { type: 'uuid' },
    },
    {
      constraints: {
        unique: ['dashboard_slug'],
        foreignKeys: [
          {
            columns: 'owner',
            references: 'users(user_id)',
          },
          {
            columns: 'competition_id',
            references: 'competitions(competition_id)',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columns: 'player_id',
            references: 'players_team_info(player_id)',
          },
        ],
      },
    },
  );

  pgm.createTable(
    'invitations',
    {
      invite_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      guest_email: { type: 'character varying(255)', notNull: true },
      card: { type: 'uuid', notNull: true },
      guest: { type: 'uuid' },
      status: { type: 'status_type' },
      created_at: {
        type: 'timestamp with time zone',
        default: lit('CURRENT_TIMESTAMP'),
      },
      invite_type: { type: 'text', default: 'standard', notNull: true },
      usage_count: { type: 'integer', default: 0, notNull: true },
    },
    {
      constraints: {
        foreignKeys: [
          {
            columns: 'card',
            references: 'player_card_images(card_image_id)',
          },
          {
            columns: 'guest',
            references: 'users(user_id)',
          },
        ],
      },
    },
  );

  pgm.createTable('age_groups', {
    age_group_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    title: { type: 'text', notNull: true },
    description: { type: 'text' },
  });

  pgm.createTable(
    'competition_results',
    {
      competition_results_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      competition_id: { type: 'uuid' },
      first_place: { type: 'uuid' },
      second_place: { type: 'uuid' },
      third_place: { type: 'uuid' },
      age_group_id: { type: 'uuid' },
    },
    {
      constraints: {
        unique: ['competition_id', ['competition_id', 'age_group_id']],
      },
    },
  );

  pgm.createTable(
    'match_results',
    {
      match_result_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      match_id: { type: 'uuid' },
      match_result: { type: 'match_outcome' },
      weather_info: { type: 'jsonb' },
      home_team_score: { type: 'smallint' },
      away_team_score: { type: 'smallint' },
      total_duration_in_minutes: { type: 'smallint' },
      overtime: { type: 'boolean' },
      penalty_kicks: { type: 'boolean' },
      match_summary: { type: 'text' },
    },
    {
      constraints: {
        unique: ['match_id'],
      },
    },
  );

  pgm.createTable(
    'matches',
    {
      match_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      competition_id: { type: 'uuid' },
      date: { type: 'timestamp without time zone', notNull: true },
      location: { type: 'character varying(255)' },
      home_team_id: { type: 'uuid' },
      away_team_id: { type: 'uuid' },
      match_number: { type: 'integer' },
      home_jersey_color: { type: 'character varying(64)' },
      away_jersey_color: { type: 'character varying(64)' },
      match_upload_id_match_data_uploads: { type: 'uuid' },
      field_name: { type: 'character varying(255)' },
    },
    {
      constraints: {
        unique: ['match_upload_id_match_data_uploads'],
      },
    },
  );

  pgm.createTable(
    'full_match_videos',
    {
      video_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      match_result_id: { type: 'uuid' },
      mux_video_id: { type: 'text' },
      mux_playback_id: { type: 'text' },
      s3_video_key: { type: 'text', notNull: true },
      mux_duration: { type: 'real' },
    },
    {
      constraints: {
        unique: ['match_result_id'],
      },
    },
  );

  pgm.createTable('highlight_video_clips', {
    highlight_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    match_result_id: { type: 'uuid', notNull: true },
    player_id: { type: 'uuid', notNull: true },
    start_timestamp: { type: 'interval', notNull: true },
    duration: { type: 'interval', notNull: true },
    clip_description: { type: 'text' },
    event_type: {
      type: 'event_enum[]',
      default: { value: 'ARRAY[]::event_enum[]', literal: true },
      notNull: true,
    },
  });

  pgm.createTable(
    'many_clubs_has_many_competitions',
    {
      club_id_clubs: { type: 'uuid', notNull: true },
      competition_id_competitions: { type: 'uuid', notNull: true },
    },
    {
      constraints: {
        primaryKey: ['club_id_clubs', 'competition_id_competitions'],
      },
    },
  );

  pgm.createTable(
    'many_users_has_many_notification_types',
    {
      user_id_users: { type: 'uuid', notNull: true },
      type_id_notification_types: { type: 'uuid', notNull: true },
    },
    {
      constraints: {
        primaryKey: ['user_id_users', 'type_id_notification_types'],
      },
    },
  );

  pgm.createTable(
    'match_data_uploads',
    {
      match_upload_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      main_team_id: { type: 'uuid' },
      opp_team_id: { type: 'uuid' },
      upload_status: {
        type: 'character varying(64)',
        default: 'not_uploaded',
        notNull: true,
      },
      match_type: {
        type: 'character varying(64)',
        default: 'regular_season',
        notNull: true,
      },
      location: { type: 'text' },
      main_jersey_color: { type: 'text' },
      opp_jersey_color: { type: 'text' },
      roster: { type: 'jsonb' },
      datetime: { type: 'timestamp without time zone' },
      home_or_away: {
        type: 'character varying(64)',
        default: 'neutral',
        notNull: true,
      },
      video_upload_id_match_video_uploads: { type: 'uuid' },
    },
    {
      constraints: {
        unique: ['video_upload_id_match_video_uploads'],
      },
    },
  );

  pgm.createTable('match_events', {
    event_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    match_id: { type: 'uuid' },
    player_id: { type: 'uuid' },
    video_timestamp: { type: 'interval', notNull: true },
    event_type: { type: 'event_enum', notNull: true },
    is_goalkeeper: { type: 'boolean', notNull: true },
    data_source: { type: 'character varying(255)' },
  });

  pgm.addIndex('match_events', 'event_type', { method: 'btree' });
  pgm.addIndex('match_events', 'match_id', { method: 'btree' });
  pgm.addIndex('match_events', 'player_id', { method: 'btree' });

  pgm.createTable('match_events_descriptions', {
    event_description_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    event_type: { type: 'event_enum', notNull: true },
    event_description: { type: 'text', notNull: true },
  });

  pgm.createTable(
    'match_events_per_player',
    {
      id: {
        type: 'text',
        expressionGenerated:
          "((((player_id)::text || '-'::text) || (match_id)::text))",
        notNull: true,
        primaryKey: true,
      },
      player_id: { type: 'uuid' },
      match_id: { type: 'uuid' },
      competition_id: { type: 'uuid' },
      club_id: { type: 'uuid' },
      data_source: { type: 'character varying(255)' },
      dribbles_total: { type: 'real' },
      dribbles_success: { type: 'real' },
      passes_total: { type: 'real' },
      passes_success: { type: 'real' },
      poor_ball_handling: { type: 'real' },
      cross_total: { type: 'real', default: 0 },
      cross_success: { type: 'real', default: 0 },
      shots_on_target: { type: 'real', default: 0 },
      goals_scored: { type: 'real', default: 0 },
      shots_total: { type: 'real', default: 0 },
      assists: { type: 'real', default: 0 },
      key_passes_success: { type: 'real', default: 0 },
      pass_final_third_total: { type: 'real', default: 0 },
      pass_final_third_success: { type: 'real', default: 0 },
      passes_long_total: { type: 'real', default: 0 },
      passes_long_success: { type: 'real', default: 0 },
      aerial_duels_total: { type: 'real', default: 0 },
      aerial_duels_success: { type: 'real', default: 0 },
      middle_passes_total: { type: 'real', default: 0 },
      middle_passes_success: { type: 'real', default: 0 },
      shots_outside_penalty_area: { type: 'real', default: 0 },
      passes_forward_total: { type: 'real', default: 0 },
      passes_forward_success: { type: 'real', default: 0 },
      mistakes: { type: 'real', default: 0 },
      clearances_success: { type: 'real', default: 0 },
      interventions: { type: 'real', default: 0 },
      tackles_total: { type: 'real', default: 0 },
      tackles_success: { type: 'real', default: 0 },
      ground_duels_total: { type: 'real', default: 0 },
      ground_duels_success: { type: 'real', default: 0 },
      catches: { type: 'real', default: 0 },
      punches: { type: 'real', default: 0 },
      goal_kicks_total: { type: 'real', default: 0 },
      goal_kicks_success: { type: 'real', default: 0 },
      aerial_clearance_total: { type: 'real', default: 0 },
      aerial_clearance_success: { type: 'real', default: 0 },
      goals_conceded: { type: 'real', default: 0 },
      fouls_suffered: { type: 'real', default: 0 },
      is_goalkeeper: { type: 'boolean' },
      shots_off_target: { type: 'real', default: 0 },
      shots_on_post: { type: 'real', default: 0 },
      play_time_outfield: {
        type: 'interval',
        default: { value: "'00:00:00'::interval", literal: true },
      },
      play_time_goalkeeper: {
        type: 'interval',
        default: { value: "'00:00:00'::interval", literal: true },
      },
      played_outfield: {
        type: 'boolean',
        expressionGenerated: "((play_time_outfield > '00:00:00'::interval))",
      },
      interceptions: { type: 'real', default: 0 },
      blocks: { type: 'real', default: 0 },
      yellow_cards: { type: 'real', default: 0 },
      red_cards: { type: 'real', default: 0 },
      play_time: {
        type: 'double precision',
        expressionGenerated:
          '((((EXTRACT(epoch FROM play_time_outfield))::double precision / (60)::double precision) + ((EXTRACT(epoch FROM play_time_goalkeeper))::double precision / (60)::double precision)))',
      },
    },
    {
      constraints: {
        unique: [['player_id', 'match_id']],
      },
    },
  );

  pgm.createTable(
    'match_player_rosters',
    {
      player_roster_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      match_id: { type: 'uuid' },
      player_id: { type: 'uuid' },
      player_number: { type: 'text' },
      is_goalkeeper: { type: 'boolean' },
    },
    {
      constraints: {
        unique: [['match_id', 'player_id']],
      },
    },
  );

  pgm.createTable('match_video_uploads', {
    video_upload_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    upload_info: { type: 'jsonb' },
    source: {
      type: 'character varying(64)',
      default: 'direct_upload',
      notNull: true,
    },
    destination_path: { type: 'text' },
  });

  pgm.createTable('notification_types', {
    type_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    name: { type: 'text', notNull: true },
    notification_mode: { type: 'notification_mode_enum' },
  });

  pgm.createTable(
    'player_match_summaries',
    {
      summary_id: {
        type: 'uuid',
        default: lit('gen_random_uuid()'),
        notNull: true,
        primaryKey: true,
      },
      player_id: { type: 'uuid', notNull: true },
      match_id: { type: 'uuid', notNull: true },
      summary: { type: 'text', notNull: true },
    },
    {
      constraints: {
        unique: [['player_id', 'match_id']],
      },
    },
  );

  pgm.createTable(
    'player_ratings',
    {
      player_id: { type: 'uuid', notNull: true },
      competition_id: { type: 'uuid', notNull: true },
      rating_date: {
        type: 'date',
        default: lit('CURRENT_DATE'),
        notNull: true,
      },
      skills_rating: { type: 'double precision' },
      attacking_rating: { type: 'double precision' },
      physical_rating: { type: 'double precision' },
      mentality_rating: { type: 'double precision' },
      defending_rating: { type: 'double precision' },
      goalkeeping_rating: { type: 'double precision' },
    },
    {
      constraints: {
        primaryKey: ['player_id', 'competition_id', 'rating_date'],
      },
    },
  );

  pgm.createTable('player_season_highlights', {
    highlight_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    player_id: { type: 'uuid' },
    version: { type: 'integer', notNull: true },
    season_highlights: { type: 'text[]', notNull: true },
    created_at: {
      type: 'timestamp without time zone',
      default: lit('now()'),
      notNull: true,
    },
    competition_id: { type: 'uuid' },
  });

  pgm.createTable('purge_user_data_requests', {
    request_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    amplify_id: { type: 'text', notNull: true },
    create_at: {
      type: 'timestamp without time zone',
      default: lit('now()'),
      notNull: true,
    },
    delete_status: {
      type: 'text',
      default: 'pending',
      notNull: true,
    },
  });

  pgm.createTable('qr_redirects', {
    qrcode_id: {
      type: 'uuid',
      default: lit('gen_random_uuid()'),
      notNull: true,
      primaryKey: true,
    },
    invite_id: { type: 'uuid' },
  });

  pgm.createTable(
    'team_coaches',
    {
      team_id: { type: 'uuid', notNull: true },
      coach_id: { type: 'uuid', notNull: true },
      start_date: { type: 'date', notNull: true },
      end_date: { type: 'date' },
    },
    {
      constraints: { primaryKey: ['team_id', 'coach_id', 'start_date'] },
    },
  );

  // In some cases these could be merged into the createTable calls but A) I
  // don't feel like it and B) ordering matters. Specifically, if table A is
  // created before table B and A has a FK referencing B, the FK will fail since
  // B won't exist yet. But if we create all the tables first, there's no longer
  // an ordering issue.

  pgm.addConstraint('competition_results', 'fk_age_group', {
    foreignKeys: {
      columns: 'age_group_id',
      references: 'age_groups(age_group_id)',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });
  pgm.addConstraint(
    'competition_results',
    'fk_competition_results_competitions',
    {
      foreignKeys: {
        columns: 'competition_id',
        references: 'competitions(competition_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint(
    'competition_results',
    'fk_competition_results_first_place',
    {
      foreignKeys: {
        columns: 'first_place',
        references: 'teams(team_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint(
    'competition_results',
    'fk_competition_results_second_place',
    {
      foreignKeys: {
        columns: 'second_place',
        references: 'teams(team_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint(
    'competition_results',
    'fk_competition_results_third_place',
    {
      foreignKeys: {
        columns: 'third_place',
        references: 'teams(team_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint(
    'full_match_videos',
    'full_match_videos_match_result_id_fkey',
    {
      foreignKeys: {
        columns: 'match_result_id',
        references: 'match_results(match_result_id)',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
  );
  pgm.addConstraint(
    'highlight_video_clips',
    'highlight_video_clips_match_result_id_fkey',
    {
      foreignKeys: {
        columns: 'match_result_id',
        references: 'match_results(match_result_id)',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
  );
  pgm.addConstraint(
    'highlight_video_clips',
    'highlight_video_clips_player_id_fkey',
    {
      foreignKeys: {
        columns: 'player_id',
        references: 'players_team_info(player_id)',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
  );
  pgm.addConstraint('many_clubs_has_many_competitions', 'clubs_fk', {
    foreignKeys: {
      columns: 'club_id_clubs',
      references: 'clubs(club_id)',
      match: 'FULL',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });
  pgm.addConstraint('many_clubs_has_many_competitions', 'competitions_fk', {
    foreignKeys: {
      columns: 'competition_id_competitions',
      references: 'competitions(competition_id)',
      match: 'FULL',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });
  pgm.addConstraint(
    'many_users_has_many_notification_types',
    'notification_types_fk',
    {
      foreignKeys: {
        columns: 'type_id_notification_types',
        references: 'notification_types(type_id)',
        match: 'FULL',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
    },
  );
  pgm.addConstraint('many_users_has_many_notification_types', 'users_fk', {
    foreignKeys: {
      columns: 'user_id_users',
      references: 'users(user_id)',
      match: 'FULL',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });
  pgm.addConstraint('match_data_uploads', 'fk_upload_main_team', {
    foreignKeys: {
      columns: 'main_team_id',
      references: 'teams(team_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('match_data_uploads', 'fk_upload_opp_team', {
    foreignKeys: {
      columns: 'opp_team_id',
      references: 'teams(team_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('match_data_uploads', 'match_video_uploads_fk', {
    foreignKeys: {
      columns: 'video_upload_id_match_video_uploads',
      references: 'match_video_uploads(video_upload_id)',
      match: 'FULL',
    },
  });
  pgm.addConstraint('match_events', 'match_events_match_id_fkey', {
    foreignKeys: { columns: 'match_id', references: 'matches(match_id)' },
  });
  pgm.addConstraint('match_events', 'match_events_player_id_fkey', {
    foreignKeys: {
      columns: 'player_id',
      references: 'players_team_info(player_id)',
    },
  });
  pgm.addConstraint('match_events_per_player', 'fk_events_club', {
    foreignKeys: {
      columns: 'club_id',
      references: 'clubs(club_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('match_events_per_player', 'fk_events_competition', {
    foreignKeys: {
      columns: 'competition_id',
      references: 'competitions(competition_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('match_events_per_player', 'fk_events_match', {
    foreignKeys: {
      columns: 'match_id',
      references: 'matches(match_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('match_events_per_player', 'fk_events_player', {
    foreignKeys: {
      columns: 'player_id',
      references: 'players_team_info(player_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('match_player_rosters', 'fk_roster_match_id', {
    foreignKeys: { columns: 'match_id', references: 'matches(match_id)' },
  });
  pgm.addConstraint('match_player_rosters', 'fk_roster_player_id', {
    foreignKeys: {
      columns: 'player_id',
      references: 'players_team_info(player_id)',
    },
  });
  pgm.addConstraint('match_results', 'fk_match_results_matches', {
    foreignKeys: {
      columns: 'match_id',
      references: 'matches(match_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('matches', 'fk_match_away_team', {
    foreignKeys: {
      columns: 'away_team_id',
      references: 'teams(team_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('matches', 'fk_match_competition', {
    foreignKeys: {
      columns: 'competition_id',
      references: 'competitions(competition_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('matches', 'fk_match_home_team', {
    foreignKeys: {
      columns: 'home_team_id',
      references: 'teams(team_id)',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint('matches', 'match_data_uploads_fk', {
    foreignKeys: {
      columns: 'match_upload_id_match_data_uploads',
      references: 'match_data_uploads(match_upload_id)',
      match: 'FULL',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });
  pgm.addConstraint(
    'player_match_summaries',
    'player_match_summaries_match_id_fkey',
    {
      foreignKeys: {
        columns: 'match_id',
        references: 'matches(match_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint(
    'player_match_summaries',
    'player_match_summaries_player_id_fkey',
    {
      foreignKeys: {
        columns: 'player_id',
        references: 'players_team_info(player_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint('player_ratings', 'fk_player_ratings_competition', {
    foreignKeys: {
      columns: 'competition_id',
      references: 'competitions(competition_id)',
    },
  });
  pgm.addConstraint('player_ratings', 'fk_player_ratings_player', {
    foreignKeys: {
      columns: 'player_id',
      references: 'players_team_info(player_id)',
    },
  });
  pgm.addConstraint(
    'player_season_highlights',
    'fk_competition_season_highlights',
    {
      foreignKeys: {
        columns: 'competition_id',
        references: 'competitions(competition_id)',
      },
    },
  );
  pgm.addConstraint(
    'player_season_highlights',
    'player_season_highlights_player_id_fkey',
    {
      foreignKeys: {
        columns: 'player_id',
        references: 'players_team_info(player_id)',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
  );
  pgm.addConstraint('team_coaches', 'team_coaches_coach_id_fkey', {
    foreignKeys: {
      columns: 'coach_id',
      references: 'coaches(coach_id)',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });
  pgm.addConstraint('team_coaches', 'team_coaches_team_id_fkey', {
    foreignKeys: {
      columns: 'team_id',
      references: 'teams(team_id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });
}

function createFunctions(pgm: Pick<MigrationBuilder, 'createFunction'>) {
  pgm.createFunction(
    'athletifi_aggregate_match_events',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      security: 'DEFINER',
    },
    `BEGIN

    -- Insert or update the match_events_per_player table
    INSERT INTO public.match_events_per_player (player_id, match_id, competition_id, club_id, is_goalkeeper, data_source)
    VALUES (
      NEW.player_id,
      NEW.match_id,
      (SELECT competition_id FROM matches WHERE match_id = NEW.match_id),
          (SELECT club_id FROM players_team_info WHERE player_id = NEW.player_id),
          NEW.is_goalkeeper,
      NEW.data_source
    )
    ON CONFLICT (player_id, match_id) DO UPDATE SET
      competition_id = EXCLUDED.competition_id,
        club_id = EXCLUDED.club_id,
      is_goalkeeper = EXCLUDED.is_goalkeeper,
      data_source = EXCLUDED.data_source;

    -- Update specific attributes based on the event type
      CASE NEW.event_type
          WHEN 'aerial_clearance_success' THEN
              UPDATE public.match_events_per_player SET
                  aerial_clearance_success = COALESCE(aerial_clearance_success, 0) + 1,
                  aerial_clearance_total = COALESCE(aerial_clearance_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'aerial_clearance_fail' THEN
              UPDATE public.match_events_per_player SET
                  aerial_clearance_total = COALESCE(aerial_clearance_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'aerial_duel_success' THEN
              UPDATE public.match_events_per_player SET
                  aerial_duels_success = COALESCE(aerial_duels_success, 0) + 1,
                  aerial_duels_total = COALESCE(aerial_duels_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'aerial_duel_fail' THEN
              UPDATE public.match_events_per_player SET
                  aerial_duels_total = COALESCE(aerial_duels_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'assist' THEN
              UPDATE public.match_events_per_player SET
                  assists = COALESCE(assists, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'block' THEN
              UPDATE public.match_events_per_player SET
                  blocks = COALESCE(blocks, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'catch' THEN
              UPDATE public.match_events_per_player SET
                  catches = COALESCE(catches, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'clearance' THEN
              UPDATE public.match_events_per_player SET
                  clearances_success = COALESCE(clearances_success, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'poor_ball_handling' THEN
              UPDATE public.match_events_per_player SET
                  poor_ball_handling = COALESCE(poor_ball_handling, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'cross_success' THEN
              UPDATE public.match_events_per_player SET
                  cross_success = COALESCE(cross_success, 0) + 1,
                  cross_total = COALESCE(cross_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'cross_fail' THEN
              UPDATE public.match_events_per_player SET
                  cross_total = COALESCE(cross_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'foul_won' THEN
              UPDATE public.match_events_per_player SET
                  fouls_suffered = COALESCE(fouls_suffered, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'goal_kick_success' THEN
              UPDATE public.match_events_per_player SET
                  goal_kicks_success = COALESCE(goal_kicks_success, 0) + 1,
                  goal_kicks_total = COALESCE(goal_kicks_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'goal_kick_fail' THEN
              UPDATE public.match_events_per_player SET
                  goal_kicks_total = COALESCE(goal_kicks_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'goal_conceded' THEN
              UPDATE public.match_events_per_player SET
                  goals_conceded = COALESCE(goals_conceded, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'goal_scored' THEN
              UPDATE public.match_events_per_player SET
                  goals_scored = COALESCE(goals_scored, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'ground_duel_success' THEN
              UPDATE public.match_events_per_player SET
                  ground_duels_success = COALESCE(ground_duels_success, 0) + 1,
                  ground_duels_total = COALESCE(ground_duels_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'ground_duel_fail' THEN
              UPDATE public.match_events_per_player SET
                  ground_duels_total = COALESCE(ground_duels_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'interception' THEN
              UPDATE public.match_events_per_player SET
                  interceptions = COALESCE(interceptions, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'intervention' THEN
              UPDATE public.match_events_per_player SET
                  interventions = COALESCE(interventions, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'key_pass' THEN
              UPDATE public.match_events_per_player SET
          key_passes_success = COALESCE(key_passes_success, 0) + 1,
          passes_success = COALESCE(passes_success, 0) + 1,
          passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'long_pass_success' THEN
              UPDATE public.match_events_per_player SET
          passes_long_success = COALESCE(passes_long_success, 0) + 1,
          passes_long_total = COALESCE(passes_long_total, 0) + 1,
          passes_success = COALESCE(passes_success, 0) + 1,
          passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'long_pass_fail' THEN
              UPDATE public.match_events_per_player SET
                  passes_long_total = COALESCE(passes_long_total, 0) + 1,
                  passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'middle_pass_success' THEN
              UPDATE public.match_events_per_player SET
          middle_passes_success = COALESCE(middle_passes_success, 0) + 1,
          middle_passes_total = COALESCE(middle_passes_total, 0) + 1,
          passes_success = COALESCE(passes_success, 0) + 1,
          passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'middle_pass_fail' THEN
              UPDATE public.match_events_per_player SET
                  middle_passes_total = COALESCE(middle_passes_total, 0) + 1,
                  passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'mistake_loss' THEN
              UPDATE public.match_events_per_player SET
                  mistakes = COALESCE(mistakes, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'pass_forward_success' THEN
              UPDATE public.match_events_per_player SET
          passes_forward_success = COALESCE(passes_forward_success, 0) + 1,
          passes_forward_total = COALESCE(passes_forward_total, 0) + 1,
          passes_success = COALESCE(passes_success, 0) + 1,
          passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'pass_forward_fail' THEN
              UPDATE public.match_events_per_player SET
                  passes_forward_total = COALESCE(passes_forward_total, 0) + 1,
                  passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'pass_final_third_success' THEN
              UPDATE public.match_events_per_player SET
          pass_final_third_success = COALESCE(pass_final_third_success, 0) + 1,
          pass_final_third_total = COALESCE(pass_final_third_total, 0) + 1,
          passes_success = COALESCE(passes_success, 0) + 1,
          passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'pass_final_third_fail' THEN
              UPDATE public.match_events_per_player SET
                  pass_final_third_total = COALESCE(pass_final_third_total, 0) + 1,
                  passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'pass_success' THEN
              UPDATE public.match_events_per_player SET
          passes_success = COALESCE(passes_success, 0) + 1,
          passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'pass_fail' THEN
              UPDATE public.match_events_per_player SET
                  passes_total = COALESCE(passes_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'punch' THEN
              UPDATE public.match_events_per_player SET
                  punches = COALESCE(punches, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'shot_on_target' THEN
              UPDATE public.match_events_per_player SET
                  shots_on_target = COALESCE(shots_on_target, 0) + 1,
                  shots_total = COALESCE(shots_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'shot_off_target' THEN
              UPDATE public.match_events_per_player SET
                  shots_off_target = COALESCE(shots_off_target, 0) + 1,
                  shots_total = COALESCE(shots_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'shot_on_post' THEN
              UPDATE public.match_events_per_player SET
                  shots_on_post = COALESCE(shots_on_post, 0) + 1,
                  shots_total = COALESCE(shots_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'shot_outside_penalty_area' THEN
              UPDATE public.match_events_per_player SET
                  shots_outside_penalty_area = COALESCE(shots_outside_penalty_area, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'tackle_success' THEN
              UPDATE public.match_events_per_player SET
                  tackles_success = COALESCE(tackles_success, 0) + 1,
                  tackles_total = COALESCE(tackles_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'tackle_fail' THEN
              UPDATE public.match_events_per_player SET
                  tackles_total = COALESCE(tackles_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'dribble_success' THEN
              UPDATE public.match_events_per_player SET
                  dribbles_success = COALESCE(dribbles_success, 0) + 1,
                  dribbles_total = COALESCE(dribbles_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'dribble_fail' THEN
              UPDATE public.match_events_per_player SET
                  dribbles_total = COALESCE(dribbles_total, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'yellow_card' THEN
              UPDATE public.match_events_per_player SET
                  yellow_cards = COALESCE(yellow_cards, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
          WHEN 'red_card' THEN
              UPDATE public.match_events_per_player SET
                  red_cards = COALESCE(red_cards, 0) + 1
              WHERE player_id = NEW.player_id AND match_id = NEW.match_id;
      WHEN 'is_goalkeeper' THEN
      END CASE;

      RETURN NEW;

    END`,
  );

  pgm.createFunction(
    'athletifi_calculate_player_ratings',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      security: 'DEFINER',
    },
    `BEGIN

    -- Insert new ratings for the affected player and competition
    INSERT INTO public.player_ratings (player_id, competition_id, rating_date, skills_rating, attacking_rating, physical_rating, mentality_rating, defending_rating, goalkeeping_rating)
    SELECT * FROM (
        WITH
        matches_played_per_player AS (
            SELECT
                player_id,
                competition_id,
                CAST(COUNT(match_id) AS DOUBLE PRECISION) AS matches_played
            FROM public.match_events_per_player
            GROUP BY player_id, competition_id
        ),
        match_sequences AS (
            SELECT
                player_id,
                public.match_events_per_player.competition_id,
                public.match_events_per_player.match_id,
                ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY match_number ASC) AS match_sequence
            FROM public.match_events_per_player
            LEFT JOIN public.matches on public.matches.match_id=public.match_events_per_player.match_id
        ),
        performance_metrics_per_player AS (
            SELECT
                sp.player_id,
                sp.competition_id,
                sp.is_goalkeeper,
                sp.played_outfield,
                sp.match_id,
                matches_played,
                m.match_sequence * 2 / (matches_played * (matches_played + 1)) AS weight,
                -- SKILL:
                CASE
                    WHEN dribbles_total = 0 THEN NULL
                    ELSE dribbles_success / NULLIF(dribbles_total, 0) END AS dribbling,
                CASE
                    WHEN passes_success = 0 THEN NULL
                    ELSE passes_success / NULLIF(play_time, 0) END AS passes_per_min,
                CASE
                    WHEN passes_total = 0 THEN NULL
                    ELSE passes_success / NULLIF(passes_total, 0) END AS pass_accuracy,
                CASE
                    WHEN poor_ball_handling = 0 THEN NULL
                    ELSE play_time / NULLIF(poor_ball_handling, 0) END AS ball_control,
                -- ATTACKING:
                CASE
                    WHEN cross_total = 0 THEN NULL
                    ELSE cross_success / NULLIF(cross_total, 0) END AS crossing,
                CASE
                    WHEN shots_on_target = 0 THEN NULL
                    ELSE goals_scored / NULLIF(shots_on_target, 0) END AS finishing,
                CASE
                    WHEN shots_total = 0 THEN NULL
                    -- ELE shots_on_target / shots_total END AS shot_accuracy,
                    -- This new calculation treats shots on target as fully accurate (weight of 1), Treats shots on post as partially accurate (weight of 0.5), and Implicitly considers shots off target as not accurate (weight of 0)
                    ELSE (shots_on_target + 0.5 * shots_on_post) / NULLIF(shots_total, 0) END AS shot_accuracy,
                CASE
                    WHEN play_time_outfield < '00:00:01' THEN NULL
                    ELSE goals_scored / NULLIF(EXTRACT(EPOCH FROM play_time_outfield)/60::float, 0) END AS goals_per_min,
                CASE
                    WHEN play_time_outfield < '00:00:01' THEN NULL
                    ELSE (assists + key_passes_success) / NULLIF(EXTRACT(EPOCH FROM play_time_outfield)/60::float, 0) END AS assists_plus_would_be_assists_per_min,
                CASE
                    WHEN pass_final_third_total = 0 THEN NULL
                    ELSE pass_final_third_success / NULLIF(pass_final_third_total, 0) END AS short_passing_attack,
                -- PHYSICAL:
                CASE
                    WHEN passes_long_total = 0 THEN NULL
                    ELSE passes_long_success / NULLIF(passes_long_total, 0) END AS long_passing,
                CASE
                    WHEN aerial_duels_total = 0 THEN NULL
                    ELSE aerial_duels_success / NULLIF(aerial_duels_total, 0) END AS jumping,
                CASE
                    WHEN middle_passes_total = 0 THEN NULL
                    ELSE middle_passes_success / NULLIF(middle_passes_total, 0) END AS middle_passing,
                CASE
                    WHEN shots_outside_penalty_area = 0 THEN NULL
                    ELSE goals_scored / NULLIF(shots_outside_penalty_area, 0) END AS long_shots,
                -- MENTALITY:
                CASE
                    WHEN passes_forward_total = 0 THEN NULL
                    ELSE passes_forward_success / NULLIF(passes_forward_total, 0) END AS assertiveness,
                -- CASE
                --     WHEN play_time = 0 THEN NULL
                --     ELE interceptions / play_time END AS interceptions_per_min,
                CASE
                    WHEN play_time = 0 THEN NULL
                    ELSE fouls_suffered / NULLIF(play_time, 0) END AS fouls_suffered_per_min,
                CASE
                    WHEN passes_forward_total = 0 THEN NULL
                    ELSE passes_forward_success / NULLIF(passes_forward_total, 0) END AS vision,
                CASE
                    WHEN mistakes = 0 THEN NULL
                    ELSE (EXTRACT(EPOCH FROM play_time_outfield)/60::float + EXTRACT(EPOCH FROM play_time_goalkeeper)/60::float) / NULLIF(mistakes, 0) END AS composure,
                -- DEFENDING:
                CASE
                    WHEN (EXTRACT(EPOCH FROM play_time_outfield)/60::float + EXTRACT(EPOCH FROM play_time_goalkeeper)/60::float) = 0 THEN NULL
                    ELSE clearances_success / NULLIF((EXTRACT(EPOCH FROM play_time_outfield)/60::float + EXTRACT(EPOCH FROM play_time_goalkeeper)/60::float), 0) END AS clearances_per_min,
                CASE
                    WHEN (EXTRACT(EPOCH FROM play_time_outfield)/60::float + EXTRACT(EPOCH FROM play_time_goalkeeper)/60::float) = 0 THEN NULL
                    ELSE interventions / NULLIF((EXTRACT(EPOCH FROM play_time_outfield)/60::float + EXTRACT(EPOCH FROM play_time_goalkeeper)/60::float), 0) END AS interventions_per_min,
                CASE
                    WHEN tackles_total = 0 THEN NULL
                    ELSE tackles_success / NULLIF(tackles_total, 0) END AS tackle,
                -- CASE
                --     WHEN play_time = 0 THEN NULL
                --     ELE blocks / play_time END AS blocks_per_min,
                CASE
                    WHEN ground_duels_total = 0 THEN NULL
                    ELSE ground_duels_success / NULLIF(ground_duels_total, 0) END AS ground_duels,
                -- GOALKEEPING:
                CASE
                    WHEN catches + punches = 0 THEN NULL
                    ELSE catches / NULLIF((catches + punches), 0) END AS gk_handling,
                CASE
                    WHEN goal_kicks_total = 0 THEN NULL
                    ELSE goal_kicks_success / NULLIF(goal_kicks_total, 0) END AS gk_kicking,
                CASE
                    WHEN aerial_clearance_total = 0 THEN NULL
                    ELSE aerial_clearance_success / NULLIF(aerial_clearance_total, 0) END AS gk_positioning,
                CASE
                    WHEN catches + punches = 0 THEN NULL
                    ELSE goals_conceded / NULLIF((catches + punches), 0) END AS gk_reflexes
            FROM public.match_events_per_player sp
            LEFT JOIN matches_played_per_player ON matches_played_per_player.player_id = sp.player_id AND matches_played_per_player.competition_id = sp.competition_id
            LEFT JOIN match_sequences m on m.match_id=sp.match_id and m.player_id=sp.player_id and m.competition_id=sp.competition_id
        ),
        avg_performance_metrics_per_player AS (
            SELECT
                player_id,
                competition_id,
                bool_or(played_outfield) AS played_outfield,
                -- SKILL:
                SUM(weight * dribbling) AS weighted_dribbling,
                SUM(weight * passes_per_min) AS weighted_passes_per_min,
                SUM(weight * pass_accuracy) AS weighted_pass_accuracy,
                SUM(weight * ball_control) AS weighted_ball_control,
                -- ATTACKING:
                SUM(weight * crossing) AS weighted_crossing,
                SUM(weight * finishing) AS weighted_finishing,
                SUM(weight * shot_accuracy) AS weighted_shot_accuracy,
                SUM(weight * goals_per_min) AS weighted_goals_per_min,
                SUM(weight * assists_plus_would_be_assists_per_min) AS weighted_assists_plus_would_be_assists_per_min,
                SUM(weight * short_passing_attack) AS weighted_short_passing_attack,
                -- PHYSICAL:
                SUM(weight * long_passing) AS weighted_long_passing,
                SUM(weight * jumping) AS weighted_jumping,
                SUM(weight * middle_passing) AS weighted_middle_passing,
                SUM(weight * long_shots) AS weighted_long_shots,
                -- MENTALITY:
                SUM(weight * assertiveness) AS weighted_assertiveness,
                -- SUM(weight * interceptions_per_min) AS weighted_interceptions_per_min,
                SUM(weight * fouls_suffered_per_min) AS weighted_fouls_suffered_per_min,
                SUM(weight * vision) AS weighted_vision,
                SUM(weight * composure) AS weighted_composure,
                -- DEFENDING:
                SUM(weight * clearances_per_min) AS weighted_clearances_per_min,
                SUM(weight * interventions_per_min) AS weighted_interventions_per_min,
                SUM(weight * tackle) AS weighted_tackle,
                -- SUM(weight * blocks_per_min) AS weighted_blocks_per_min,
                SUM(weight * ground_duels) AS weighted_ground_duels,
                -- GOALKEEPING:
                CASE
                    WHEN bool_or(is_goalkeeper) THEN SUM(weight * gk_handling)
                    ELSE NULL
                END AS weighted_gk_handling,
                CASE
                    WHEN bool_or(is_goalkeeper) THEN SUM(weight * gk_kicking)
                    ELSE NULL
                END AS weighted_gk_kicking,
                CASE
                    WHEN bool_or(is_goalkeeper) THEN SUM(weight * gk_positioning)
                    ELSE NULL
                END AS weighted_gk_positioning,
                CASE
                    WHEN bool_or(is_goalkeeper) THEN SUM(weight * gk_reflexes)
                    ELSE NULL
                END AS weighted_gk_reflexes
            FROM performance_metrics_per_player
            GROUP BY player_id, competition_id
        ),
        competition_averages AS (
            SELECT
                competition_id,
                -- SKILL:
                AVG(dribbling) AS competition_id_dribbling_avg,
                AVG(passes_per_min) AS competition_id_passes_per_min_avg,
                AVG(pass_accuracy) AS competition_id_pass_accuracy_avg,
                AVG(ball_control) AS competition_id_ball_control_avg,
                COALESCE(NULLIF((MAX(dribbling) - AVG(dribbling)) / 3, 0), 0) AS competition_id_dribbling_deviation,
                COALESCE(NULLIF((MAX(passes_per_min) - AVG(passes_per_min)) / 3, 0), 0) AS competition_id_passes_per_min_deviation,
                COALESCE(NULLIF((MAX(pass_accuracy) - AVG(pass_accuracy)) / 3, 0), 0) AS competition_id_pass_accuracy_deviation,
                COALESCE(NULLIF((MAX(ball_control) - AVG(ball_control)) / 3, 0), 0) AS competition_id_ball_control_deviation,
                -- ATTACKING:
                AVG(crossing) AS competition_id_crossing_avg,
                AVG(finishing) AS competition_id_finishing_avg,
                AVG(shot_accuracy) AS competition_id_shot_accuracy_avg,
                AVG(goals_per_min) AS competition_id_goals_per_min_avg,
                AVG(assists_plus_would_be_assists_per_min) AS competition_id_assists_plus_would_be_assists_per_min_avg,
                AVG(short_passing_attack) AS competition_id_short_passing_attack_avg,
                COALESCE(NULLIF((MAX(crossing) - AVG(crossing)) / 3, 0), 0) AS competition_id_crossing_deviation,
                COALESCE(NULLIF((MAX(finishing) - AVG(finishing)) / 3, 0), 0) AS competition_id_finishing_deviation,
                COALESCE(NULLIF((MAX(shot_accuracy) - AVG(shot_accuracy)) / 3, 0), 0) AS competition_id_shot_accuracy_deviation,
                COALESCE(NULLIF((MAX(goals_per_min) - AVG(goals_per_min)) / 3, 0), 0) AS competition_id_goals_per_min_deviation,
                COALESCE(NULLIF((MAX(assists_plus_would_be_assists_per_min) - AVG(assists_plus_would_be_assists_per_min)) / 3, 0), 0) AS competition_id_assists_plus_would_be_assists_per_min_deviation,
                COALESCE(NULLIF((MAX(short_passing_attack) - AVG(short_passing_attack)) / 3, 0), 0) AS competition_id_short_passing_attack_deviation,
                -- PHYSICAL:
                AVG(long_passing) AS competition_id_long_passing_avg,
                AVG(jumping) AS competition_id_jumping_avg,
                AVG(middle_passing) AS competition_id_middle_passing_avg,
                AVG(long_shots) AS competition_id_long_shots_avg,
                COALESCE(NULLIF((MAX(long_passing) - AVG(long_passing)) / 3, 0), 0) AS competition_id_long_passing_deviation,
                COALESCE(NULLIF((MAX(jumping) - AVG(jumping)) / 3, 0), 0) AS competition_id_jumping_deviation,
                COALESCE(NULLIF((MAX(middle_passing) - AVG(middle_passing)) / 3, 0), 0) AS competition_id_middle_passing_deviation,
                COALESCE(NULLIF((MAX(long_shots) - AVG(long_shots)) / 3, 0), 0) AS competition_id_long_shots_deviation,
                -- MENTALITY:
                AVG(assertiveness) AS competition_id_assertiveness_avg,
                -- AVG(interceptions_per_min) AS competition_id_interceptions_per_min_avg,
                AVG(fouls_suffered_per_min) AS competition_id_fouls_suffered_per_min_avg,
                AVG(vision) AS competition_id_vision_avg,
                AVG(composure) AS competition_id_composure_avg,
                COALESCE(NULLIF((MAX(assertiveness) - AVG(assertiveness)) / 3, 0), 0) AS competition_id_assertiveness_deviation,
                -- (MAX(interceptions_per_min) - AVG(interceptions_per_min)) / 3 AS competition_id_interceptions_per_min_deviation,
                COALESCE(NULLIF((MAX(fouls_suffered_per_min) - AVG(fouls_suffered_per_min)) / 3, 0), 0) AS competition_id_fouls_suffered_per_min_deviation,
                COALESCE(NULLIF((MAX(vision) - AVG(vision)) / 3, 0), 0) AS competition_id_vision_deviation,
                COALESCE(NULLIF((MAX(composure) - AVG(composure)) / 3, 0), 0) AS competition_id_composure_deviation,
                -- DEFENDING:
                AVG(clearances_per_min) AS competition_id_clearances_per_min_avg,
                AVG(interventions_per_min) AS competition_id_interventions_per_min_avg,
                AVG(tackle) AS competition_id_tackle_avg,
                -- AVG(blocks_per_min) AS competition_id_blocks_per_min_avg,
                AVG(ground_duels) AS competition_id_ground_duels_avg,
                COALESCE(NULLIF((MAX(clearances_per_min) - AVG(clearances_per_min)) / 3, 0), 0) AS competition_id_clearances_per_min_deviation,
                COALESCE(NULLIF((MAX(interventions_per_min) - AVG(interventions_per_min)) / 3, 0), 0) AS competition_id_interventions_per_min_deviation,
                COALESCE(NULLIF((MAX(tackle) - AVG(tackle)) / 3, 0), 0) AS competition_id_tackle_deviation,
                -- (MAX(blocks_per_min) - AVG(blocks_per_min)) / 3 AS competition_id_blocks_per_min_deviation,
                COALESCE(NULLIF((MAX(ground_duels) - AVG(ground_duels)) / 3, 0), 0) AS competition_id_ground_duels_deviation,
                -- GOALKEEPING:
                AVG(CASE WHEN is_goalkeeper THEN gk_handling ELSE NULL END) AS competition_id_gk_handling_avg,
                AVG(CASE WHEN is_goalkeeper THEN gk_kicking ELSE NULL END) AS competition_id_gk_kicking_avg,
                AVG(CASE WHEN is_goalkeeper THEN gk_positioning ELSE NULL END) AS competition_id_gk_positioning_avg,
                AVG(CASE WHEN is_goalkeeper THEN gk_reflexes ELSE NULL END) AS competition_id_gk_reflexes_avg,
                COALESCE(NULLIF((MAX(CASE WHEN is_goalkeeper THEN gk_handling ELSE NULL END) - AVG(CASE WHEN is_goalkeeper THEN gk_handling ELSE NULL END)) / 3, 0), 0) AS competition_id_gk_handling_deviation,
                COALESCE(NULLIF((MAX(CASE WHEN is_goalkeeper THEN gk_kicking ELSE NULL END) - AVG(CASE WHEN is_goalkeeper THEN gk_kicking ELSE NULL END)) / 3, 0), 0) AS competition_id_gk_kicking_deviation,
                COALESCE(NULLIF((MAX(CASE WHEN is_goalkeeper THEN gk_positioning ELSE NULL END) - AVG(CASE WHEN is_goalkeeper THEN gk_positioning ELSE NULL END)) / 3, 0), 0) AS competition_id_gk_positioning_deviation,
                COALESCE(NULLIF((MAX(CASE WHEN is_goalkeeper THEN gk_reflexes ELSE NULL END) - AVG(CASE WHEN is_goalkeeper THEN gk_reflexes ELSE NULL END)) / 3, 0), 0) AS competition_id_gk_reflexes_deviation
            FROM performance_metrics_per_player
            GROUP BY competition_id
        ),
        scores_per_player AS (
            SELECT
                avg_performance_metrics_per_player.player_id,
                avg_performance_metrics_per_player.competition_id,
                avg_performance_metrics_per_player.played_outfield,
                -- SKILL:
                85 - (competition_id_dribbling_avg - weighted_dribbling) * 10 / COALESCE(NULLIF(competition_id_dribbling_deviation, 0), 1) AS dribbling_score,
                85 - (competition_id_passes_per_min_avg - weighted_passes_per_min) * 10 / COALESCE(NULLIF(competition_id_passes_per_min_deviation, 0), 1) AS passes_per_min_score,
                85 - (competition_id_pass_accuracy_avg - weighted_pass_accuracy) * 10 / COALESCE(NULLIF(competition_id_pass_accuracy_deviation, 0), 1) AS pass_accuracy_score,
                85 - (competition_id_ball_control_avg - weighted_ball_control) * 10 / COALESCE(NULLIF(competition_id_ball_control_deviation, 0), 1) AS ball_control_score,
                -- ATTACKING:
                85 - (competition_id_crossing_avg - weighted_crossing) * 10 / COALESCE(NULLIF(competition_id_crossing_deviation, 0), 1) AS crossing_score,
                85 - (competition_id_finishing_avg - weighted_finishing) * 10 / COALESCE(NULLIF(competition_id_finishing_deviation, 0), 1) AS finishing_score,
                85 - (competition_id_shot_accuracy_avg - weighted_shot_accuracy) * 10 / COALESCE(NULLIF(competition_id_shot_accuracy_deviation, 0), 1) AS shot_accuracy_score,
                85 - (competition_id_goals_per_min_avg - weighted_goals_per_min) * 10 / COALESCE(NULLIF(competition_id_goals_per_min_deviation, 0), 1) AS goals_per_min_score,
                85 - (competition_id_assists_plus_would_be_assists_per_min_avg - weighted_assists_plus_would_be_assists_per_min) * 10 / COALESCE(NULLIF(competition_id_assists_plus_would_be_assists_per_min_deviation, 0), 1) AS assists_plus_would_be_assists_per_min_score,
                85 - (competition_id_short_passing_attack_avg - weighted_short_passing_attack) * 10 / COALESCE(NULLIF(competition_id_short_passing_attack_deviation, 0), 1) AS short_passing_attack_score,
                -- PHYSICAL:
                85 - (competition_id_long_passing_avg - weighted_long_passing) * 10 / COALESCE(NULLIF(competition_id_long_passing_deviation, 0), 1) AS long_passing_score,
                85 - (competition_id_jumping_avg - weighted_jumping) * 10 / COALESCE(NULLIF(competition_id_jumping_deviation, 0), 1) AS jumping_score,
                85 - (competition_id_middle_passing_avg - weighted_middle_passing) * 10 / COALESCE(NULLIF(competition_id_middle_passing_deviation, 0), 1) AS middle_passing_score,
                85 - (competition_id_long_shots_avg - weighted_long_shots) * 10 / COALESCE(NULLIF(competition_id_long_shots_deviation, 0), 1) AS long_shots_score,
                -- MENTALITY:
                85 - (competition_id_assertiveness_avg - weighted_assertiveness) * 10 / COALESCE(NULLIF(competition_id_assertiveness_deviation, 0), 1) AS assertiveness_score,
                -- 85 - (competition_id_interceptions_per_min_avg - weighted_interceptions_per_min) * 10 / competition_id_interceptions_per_min_deviation AS interceptions_per_min_score,
                85 - (competition_id_fouls_suffered_per_min_avg - weighted_fouls_suffered_per_min) * 10 / COALESCE(NULLIF(competition_id_fouls_suffered_per_min_deviation, 0), 1) AS fouls_suffered_per_min_score,
                85 - (competition_id_vision_avg - weighted_vision) * 10 / COALESCE(NULLIF(competition_id_vision_deviation, 0), 1) AS vision_score,
				85 - (competition_id_composure_avg - weighted_composure) * 10 / COALESCE(NULLIF(competition_id_composure_deviation, 0), 1) AS composure_score,
                -- DEFENDING:
                85 - (competition_id_clearances_per_min_avg - weighted_clearances_per_min) * 10 / COALESCE(NULLIF(competition_id_clearances_per_min_deviation, 0), 1) AS clearances_per_min_score,
                85 - (competition_id_interventions_per_min_avg - weighted_interventions_per_min) * 10 / COALESCE(NULLIF(competition_id_interventions_per_min_deviation, 0), 1) AS interventions_per_min_score,
				85 - (competition_id_tackle_avg - weighted_tackle) * 10 / COALESCE(NULLIF(competition_id_tackle_deviation, 0), 1) AS tackle_score,
                -- 85 - (competition_id_blocks_per_min_avg - weighted_blocks_per_min) * 10 / competition_id_blocks_per_min_deviation AS blocks_per_min_score,
                85 - (competition_id_ground_duels_avg - weighted_ground_duels) * 10 / COALESCE(NULLIF(competition_id_ground_duels_deviation, 0), 1) AS ground_duels_score,
                -- GOALKEEPING:
                85 - (competition_id_gk_handling_avg - weighted_gk_handling) * 10 / COALESCE(NULLIF(competition_id_gk_handling_deviation, 0), 1) AS gk_handling_score,
                85 - (competition_id_gk_kicking_avg - weighted_gk_kicking) * 10 / COALESCE(NULLIF(competition_id_gk_kicking_deviation, 0), 1) AS gk_kicking_score,
                85 - (competition_id_gk_positioning_avg - weighted_gk_positioning) * 10 / COALESCE(NULLIF(competition_id_gk_positioning_deviation, 0), 1) AS gk_positioning_score,
                85 - (competition_id_gk_reflexes_avg - weighted_gk_reflexes) * 10 / COALESCE(NULLIF(competition_id_gk_reflexes_deviation, 0), 1) AS gk_reflexes_score
            FROM avg_performance_metrics_per_player
            LEFT JOIN competition_averages ON competition_averages.competition_id = avg_performance_metrics_per_player.competition_id
        ),
        ratings_per_player AS (
	        SELECT
	            player_id,
	            competition_id,
	            CURRENT_DATE,
	            -- SKILL:
	            -- (dribbling_score + passes_per_min_score + pass_accuracy_score + ball_control_score) / 4 AS skills_rating,
	            CASE
	                WHEN (CASE WHEN dribbling_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN passes_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN pass_accuracy_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN ball_control_score IS NOT NULL THEN 1 ELSE 0 END) = 0 THEN NULL
	                ELSE (COALESCE(dribbling_score, 0) +
	                    COALESCE(passes_per_min_score, 0) +
	                    COALESCE(pass_accuracy_score, 0) +
	                    COALESCE(ball_control_score, 0)) /
	                    NULLIF((CASE WHEN dribbling_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN passes_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN pass_accuracy_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN ball_control_score IS NOT NULL THEN 1 ELSE 0 END), 0)
	            END AS skills_rating,
	            -- ATTACKING:
	            -- (crossing_score + finishing_score + shot_accuracy_score + goals_per_min_score + assists_plus_would_be_assists_per_min_score + short_passing_attack_score) / 6 AS attacking_rating,
	            CASE
	                WHEN played_outfield THEN
	                    CASE
	                        WHEN (CASE WHEN crossing_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN finishing_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN shot_accuracy_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN goals_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN assists_plus_would_be_assists_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN short_passing_attack_score IS NOT NULL THEN 1 ELSE 0 END) = 0 THEN NULL
	                        ELSE (COALESCE(crossing_score, 0) +
	                            COALESCE(finishing_score, 0) +
	                            COALESCE(shot_accuracy_score, 0) +
	                            COALESCE(goals_per_min_score, 0) +
	                            COALESCE(assists_plus_would_be_assists_per_min_score, 0) +
	                            COALESCE(short_passing_attack_score, 0)) /
	                            NULLIF((CASE WHEN crossing_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN finishing_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN shot_accuracy_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN goals_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN assists_plus_would_be_assists_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                            CASE WHEN short_passing_attack_score IS NOT NULL THEN 1 ELSE 0 END), 0)
	                    END
	                ELSE NULL
	            END AS attacking_rating,
	            -- PHYSICAL:
	            -- (long_passing_score + jumping_score + middle_passing_score + long_shots_score) / 4 AS physical_rating,
	            CASE
	                WHEN (CASE WHEN long_passing_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN jumping_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN middle_passing_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN long_shots_score IS NOT NULL THEN 1 ELSE 0 END) = 0 THEN NULL
	                ELSE (COALESCE(long_passing_score, 0) +
	                    COALESCE(jumping_score, 0) +
	                    COALESCE(middle_passing_score, 0) +
	                    COALESCE(long_shots_score, 0)) /
	                    NULLIF((CASE WHEN long_passing_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN jumping_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN middle_passing_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN long_shots_score IS NOT NULL THEN 1 ELSE 0 END), 0)
	            END AS physical_rating,
	            -- MENTALITY:
	            -- (assertiveness_score + fouls_suffered_per_min_score + vision_score + composure_score) / 4 AS mentality_rating,
	            CASE
	                WHEN (CASE WHEN assertiveness_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN fouls_suffered_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN vision_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN composure_score IS NOT NULL THEN 1 ELSE 0 END) = 0 THEN NULL
	                ELSE (COALESCE(assertiveness_score, 0) +
	                    COALESCE(fouls_suffered_per_min_score, 0) +
	                    COALESCE(vision_score, 0) +
	                    COALESCE(composure_score, 0)) /
	                    NULLIF((CASE WHEN assertiveness_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN fouls_suffered_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN vision_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN composure_score IS NOT NULL THEN 1 ELSE 0 END), 0)
	            END AS mentality_rating,
	            -- DEFENDING:
	            -- (clearances_per_min_score + interventions_per_min_score + tackle_score + ground_duels_score) / 4 AS defending_rating,
	            CASE
	                WHEN (CASE WHEN clearances_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN interventions_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN tackle_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN ground_duels_score IS NOT NULL THEN 1 ELSE 0 END) = 0 THEN NULL
	                ELSE (COALESCE(clearances_per_min_score, 0) +
	                    COALESCE(interventions_per_min_score, 0) +
	                    COALESCE(tackle_score, 0) +
	                    COALESCE(ground_duels_score, 0)) /
	                    NULLIF((CASE WHEN clearances_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN interventions_per_min_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN tackle_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN ground_duels_score IS NOT NULL THEN 1 ELSE 0 END), 0)
	            END AS defending_rating,
	            -- GOALKEEPING:
	            -- CASE
	            --     WHEN gk_handling_score IS NULL AND gk_kicking_score IS NULL AND gk_positioning_score IS NULL AND gk_reflexes_score IS NULL THEN NULL
	            --     ELSE (COALESCE(gk_handling_score, 0) + COALESCE(gk_kicking_score, 0) + COALESCE(gk_positioning_score, 0) + COALESCE(gk_reflexes_score, 0)) / 4
	            -- END AS goalkeeping_rating
	            CASE
	                WHEN (CASE WHEN gk_handling_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN gk_kicking_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN gk_positioning_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN gk_reflexes_score IS NOT NULL THEN 1 ELSE 0 END) = 0 THEN NULL
	                ELSE (COALESCE(gk_handling_score, 0) +
	                    COALESCE(gk_kicking_score, 0) +
	                    COALESCE(gk_positioning_score, 0) +
	                    COALESCE(gk_reflexes_score, 0)) /
	                    NULLIF((CASE WHEN gk_handling_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN gk_kicking_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN gk_positioning_score IS NOT NULL THEN 1 ELSE 0 END +
	                    CASE WHEN gk_reflexes_score IS NOT NULL THEN 1 ELSE 0 END), 0)
	            END AS goalkeeping_rating
	        FROM scores_per_player
		)
		SELECT
			player_id,
			competition_id,
			current_date,
			CASE WHEN skills_rating IS NULL OR skills_rating < 60.0 THEN 60.0 ELSE skills_rating END AS skills_rating,
			CASE WHEN attacking_rating IS NULL OR attacking_rating < 60.0 THEN 60.0 ELSE attacking_rating END AS attacking_rating,
			CASE WHEN physical_rating IS NULL OR physical_rating < 60.0 THEN 60.0 ELSE physical_rating END AS physical_rating,
			CASE WHEN mentality_rating IS NULL OR mentality_rating < 60.0 THEN 60.0 ELSE mentality_rating END AS mentality_rating,
			CASE WHEN defending_rating IS NULL OR defending_rating < 60.0 THEN 60.0 ELSE defending_rating END AS defending_rating,
			CASE WHEN goalkeeping_rating IS NULL OR goalkeeping_rating < 60.0 THEN 60.0 ELSE goalkeeping_rating END AS goalkeeping_rating
		FROM ratings_per_player
    ) AS subquery
    WHERE player_id = NEW.player_id AND competition_id = NEW.competition_id
    ON CONFLICT (player_id, competition_id, rating_date) DO UPDATE
    SET
        skills_rating = EXCLUDED.skills_rating,
        attacking_rating = EXCLUDED.attacking_rating,
        physical_rating = EXCLUDED.physical_rating,
        mentality_rating = EXCLUDED.mentality_rating,
        defending_rating = EXCLUDED.defending_rating,
        goalkeeping_rating = EXCLUDED.goalkeeping_rating;

    RETURN NEW;

    END`,
  );

  pgm.createFunction(
    'athletifi_generate_highlight_events',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      security: 'DEFINER',
    },
    `BEGIN

    IF NEW.event_type IN ('interception', 'intervention', 'tackle_success', 'shot_on_target', 'goal_scored', 'aerial_duel_success', 'assist') THEN
      INSERT INTO public.highlight_video_clips (match_result_id, player_id, start_timestamp, duration, clip_description, event_type)
      VALUES (
        (SELECT match_result_id FROM match_results WHERE match_id = NEW.match_id),
        NEW.player_id,
        CASE
          WHEN NEW.video_timestamp < interval '10 seconds' THEN interval '0 seconds'
          ELSE NEW.video_timestamp - interval '10 seconds'
        END,
        interval '20 seconds',
        CASE NEW.event_type
          WHEN 'interception' THEN 'Interception'
          WHEN 'intervention' THEN 'Intervention'
          WHEN 'tackle_success' THEN 'Successful tackle'
          WHEN 'shot_on_target' THEN 'Shot on goal'
          WHEN 'goal_scored' THEN 'Goal scored'
          WHEN 'aerial_duel_success' THEN 'Successful aerial duel'
          WHEN 'assist' THEN 'Assist'
        END,
        ARRAY[NEW.event_type]::public.event_enum[]
      );
    END IF;
    RETURN NEW;

    END`,
  );

  pgm.createFunction(
    'fn_set_next_highlight_version',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      security: 'DEFINER',
    },
    `BEGIN

    -- Set the version number to 1 more than the current max for this player
    NEW.version := COALESCE((SELECT MAX(version) FROM public.player_season_highlights WHERE player_id = NEW.player_id), 0) + 1;
    RETURN NEW;

    END`,
  );
}

function createTriggers(pgm: Pick<MigrationBuilder, 'createTrigger'>) {
  pgm.createTrigger('match_events', 'trg_aggregate_match_events', {
    when: 'AFTER',
    operation: 'INSERT',
    level: 'ROW',
    function: 'athletifi_aggregate_match_events',
  });

  pgm.createTrigger('match_events_per_player', 'trg_calculate_player_ratings', {
    when: 'AFTER',
    operation: 'INSERT',
    level: 'ROW',
    function: 'athletifi_calculate_player_ratings',
  });

  pgm.createTrigger('match_events', 'trg_generate_highlight_events', {
    when: 'AFTER',
    operation: 'INSERT',
    level: 'ROW',
    function: 'athletifi_generate_highlight_events',
  });

  pgm.createTrigger('player_season_highlights', 'trg_set_highlight_version', {
    when: 'BEFORE',
    operation: 'INSERT',
    level: 'ROW',
    function: 'fn_set_next_highlight_version',
  });
}

function addComments(pgm: Pick<MigrationBuilder, 'sql'>) {
  pgm.sql(
    `COMMENT ON TYPE public.interaction_enum IS
    'Enumeration of all possible types of player interactions/events during a match. Used in match_events and highlight_video_clips tables to categorize player actions.'`,
  );
}

function setPermissions(pgm: MigrationBuilder) {
  // This is a hack but it works and I haven't been able to figure out how to do
  // it without this (e.g. with SQL statements in mock-sql.ts)
  if ('test' in global) {
    pgm.createRole('RDS_proxy', { login: true });
    pgm.createRole('read_only_user', { login: true });
  }

  pgm.grantOnSchemas({
    privileges: 'USAGE',
    roles: ['RDS_proxy', 'read_only_user'],
    schemas: 'public',
  });

  const tables: Name[] = [
    'age_groups',
    'clubs',
    'coaches',
    'competition_results',
    'competitions',
    'match_results',
    'matches',
    'player_identities',
    'players_team_info',
    'teams',
    'full_match_videos',
    'highlight_video_clips',
    'invitations',
    'league',
    'many_clubs_has_many_competitions',
    'many_users_has_many_notification_types',
    'match_data_uploads',
    'match_events',
    'match_events_descriptions',
    'match_events_per_player',
    'match_player_rosters',
    'match_video_uploads',
    'notification_types',
    'player_card_images',
    'player_match_summaries',
    'player_ratings',
    'player_season_highlights',
    'purge_user_data_requests',
    'qr_redirects',
    'team_coaches',
    'users',
  ];

  // The read only user can read everything
  pgm.grantOnTables({
    tables,
    privileges: 'SELECT',
    roles: 'read_only_user',
  });

  // The proxy user can select, insert, and update everything
  pgm.grantOnTables({
    tables,
    privileges: ['SELECT', 'INSERT', 'UPDATE'],
    roles: 'RDS_proxy',
  });

  // The proxy user can also delete from specific tables
  pgm.grantOnTables({
    tables: ['many_users_has_many_notification_types'],
    privileges: 'DELETE',
    roles: 'RDS_proxy',
  });
}
