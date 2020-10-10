const CUSTOM_TOKENS = {
  params: 'params',
  body: 'body'
};

const TokensHandlersMap = new Map([
  [CUSTOM_TOKENS.params, req => JSON.stringify(req.params)],
  [CUSTOM_TOKENS.body, req => JSON.stringify(req.body)]
]);

module.exports = { CUSTOM_TOKENS, TokensHandlersMap };
