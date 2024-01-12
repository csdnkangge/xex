/** When your routing table is too long, you can split it into small modules**/
const errorRouter = {
  path: '/error',
  component: 'layout/Layout',
  name: 'ErrorPages',
  label: 'errorPages',
  icon: 'icon-template',
  hidden: true,
  children: [
    { path: '401', component: 'errorPage/401', name: 'Menu401', label: 'page401', noCache: true },
    { path: '404', component: 'errorPage/404', name: 'Menu404', label: 'page404', noCache: true }
  ]
}
export default errorRouter
