exports.handler = async (event) => {
  // Placeholder email sender - integrate with SendGrid/Resend in production
  try {
    const body = JSON.parse(event.body || '{}');
    console.log('sendEmail placeholder', body);
  } catch {}
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
