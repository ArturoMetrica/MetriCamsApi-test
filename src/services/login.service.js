module.exports = (req, res, next) => {
  const { isMobile, isDesktop, isBot, browser, version, os, platform, source } =
    req.useragent;

  let stringIdentity = `${req.ip || req.ips || req.socket.remoteAddress}|`;

  if (isDesktop) stringIdentity += "desktop|";
  else if (isMobile) stringIdentity += "mobile|";
  else if (isBot) stringIdentity += `${isBot}|`;
  else stringIdentity += "unknown|";

  stringIdentity += `${browser}|${version}|${os}|${platform}|${source}`;

  req.userIdentity = stringIdentity;
  next();
};

/********************* Propiedad de Métrica Móvil SA de CV **************************/