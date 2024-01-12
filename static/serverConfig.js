window.g = {}
var $host = window.location.host
const protocol = document.location.protocol
var $site
// https://partner.taucoin.online/api/
switch ($host) {
  case 'localhost:9702':
    $site = '//192.168.192.158:8084'
    break
  case '192.168.192.19:9702':
    $site = '//192.168.192.158:8084'
    // $site = '//partner.v-link.xyz'
    break
  default:
    $site = `//${$host}`
}
if ($site == '//192.168.192.158:8084') {
  // window.g.baseUrl = protocol + $site + '/'
  window.g.baseUrl='https://partner.v-link.xyz/api/'
} else {
  window.g.baseUrl = protocol + $site + '/api/'
  // window.g.baseUrl = 'https://partner.v-link.xyz/api/'
}
