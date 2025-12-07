import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config'; // Using @ alias

// 1. Debug Log: Check if config loaded
console.log('Keystatic Config Loaded:', config ? 'YES' : 'NO');
console.log('Storage Kind:', config?.storage?.kind); // MUST SAY 'github'

const { GET: _GET, POST: _POST } = makeRouteHandler({
  config,
  clientId: 'Ov23lixY9XM5bWD2o83k',
  clientSecret: 'e1db23eb50d847d3b5af99f111d7ec9d71b875c4',
  secret: 'killuasoldykassasingonfreaksfriend',
});

export async function GET(request: Request) {
  return _GET(request);
}

export async function POST(request: Request) {
  return _POST(request);
}
