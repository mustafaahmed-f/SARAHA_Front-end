export function disableLink(e) {
  if (window.location.pathname === e.currentTarget.getAttribute("href"))
    e.preventDefault();
}
