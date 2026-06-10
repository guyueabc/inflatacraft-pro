const zod = require('./node_modules/zod');
const { z } = zod;
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Check for input/output
console.log('z.input:', typeof z.input);
console.log('z.output:', typeof z.output);
console.log('z.infer:', typeof z.infer);
console.log('z.Infer:', typeof z.Infer);

// Try schema methods
console.log('schema._type:', typeof schema._type);
console.log('schema._input:', typeof schema._input);
console.log('schema._output:', typeof schema._output);

// Check what @hookform/resolvers/zod expects
try {
  const resolver = require('@hookform/resolvers/zod');
  console.log('zodResolver keys:', Object.keys(resolver));
} catch(e) {
  console.log('resolver error:', e.message);
}
