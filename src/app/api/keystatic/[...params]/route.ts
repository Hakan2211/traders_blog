import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  // ⚠️ TEMPORARY: Hardcode keys to test connection
  clientId: 'Ov23lixY9XM5bWD2o83k',
  clientSecret: 'e1db23eb50d847d3b5af99f111d7ec9d71b875c4',
  secret: 'killuasoldykassasingonfreaksfriend', // Your random string
});
