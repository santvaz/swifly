import { d as db, A as AstrojsWebVitals_Metric } from './_projectId__hDyHbqSq.mjs';
import * as z from 'zod';
import { sql } from '@astrojs/db/dist/runtime/virtual.js';

const RatingSchema = z.enum(["good", "needs-improvement", "poor"]);
const MetricTypeSchema = z.enum(["CLS", "INP", "LCP", "FCP", "FID", "TTFB"]);
const MetricIdSchema = z.string().regex(/^v4-\d{13}-\d{13}$/).transform((id) => id.replace(/^(v4-\d{8})\d{5}(-\d{13})$/, "$1$2"));
const ClientMetricSchema = z.object({
  pathname: z.string(),
  route: z.string(),
  name: MetricTypeSchema,
  id: MetricIdSchema,
  value: z.number().gte(0),
  rating: RatingSchema
});
const ServerMetricSchema = ClientMetricSchema.transform((metric) => {
  const timestamp = /* @__PURE__ */ new Date();
  timestamp.setMinutes(0, 0, 0);
  return { ...metric, timestamp };
});

const prerender = false;
const ALL = async ({ request }) => {
  try {
    const rawBody = await request.json();
    const body = ServerMetricSchema.array().parse(rawBody);
    await db.insert(AstrojsWebVitals_Metric).values(body).onConflictDoUpdate({
      target: AstrojsWebVitals_Metric.id,
      set: { value: sql`excluded.value` }
    });
  } catch (error) {
    console.error(error);
  }
  return new Response();
};

export { ALL, prerender };
