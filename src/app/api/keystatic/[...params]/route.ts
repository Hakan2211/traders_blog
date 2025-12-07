import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  // ⚠️ TEMPORARY: Hardcode keys to test connection
  clientId: 'Ov23lixV2afUdVhSMnnJ',
  clientSecret: 'cf6ad7176bfb9ef5293425182abce9937bacd324',
  secret: 'killuasoldykassasingonfreaksfriend', // Your random string
});
