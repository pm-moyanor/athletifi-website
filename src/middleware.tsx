import { NextResponse, NextRequest } from 'next/server';

const MIN_PLAYER_ID = 1;
const MAX_PLAYER_ID = 300;
// const MAX_PLAYER_ID = 1134;

export function middleware(request: NextRequest) {
  const urlSplit = request.url.split('/');
  const playerId = parseInt(urlSplit[urlSplit.length - 1]);

  // If the playerId is inside of boundaries, continue as normal
  if (
    (urlSplit[urlSplit.length - 2] == 'dashboard' &&
      urlSplit[urlSplit.length - 1] == '404') ||
    (playerId >= MIN_PLAYER_ID && playerId <= MAX_PLAYER_ID)
  ) {
    return NextResponse.next();
  }

  // Redirect to Custom 404 page if not
  return NextResponse.redirect(new URL('/dashboard/404', request.url));
}

export const config = {
  matcher: '/dashboard/:path*',
};
