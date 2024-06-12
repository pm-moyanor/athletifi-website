// // atoms/invitations.ts
// import { atomWithStorage } from 'jotai/utils';
// import { atom, WritableAtom } from 'jotai';

// interface Invitation {
//   name: string;
//   email: string;
// }

// interface InviteAction {
//   action: 'invite' | 'revoke';
//   guest_email: string;
//   card_image_id: string;
//   inviteId?: string;
// }

// //store the list of invitations (if needed)
// export const invitationsAtom = atom<Invitation[]>([]);

// //store the status of invitation actions
// export const inviteStatusAtom = atom<'idle' | 'loading' | 'success' | 'error'>(
//   'idle',
// );

// //  perform the invitation action
// export const inviteActionAtom: WritableAtom<
//   null,
//   InviteAction,
//   Promise<void>
// > = atom(null, async (_get, set, action) => {
//   set(inviteStatusAtom, 'loading');
//   try {
//     const response = await fetch('/el-endpoint?', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(action),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to perform the action');
//     }
//     set(inviteStatusAtom, 'success');
//   } catch (error) {
//     console.error(error);
//     set(inviteStatusAtom, 'error');
//   }
// });
