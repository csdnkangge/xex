import Vue from 'vue'
import VueI18n from 'vue-i18n' // 引入vue-i18n
// import Cookies from 'js-cookie'
import { getLanguage, setLanguage } from "@/utils/language";
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'
Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
const i18n = new VueI18n({
  locale: getLanguage() || 'zh',
  messages
})
export default i18n
