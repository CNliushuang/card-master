import {timesToDate, changeCronToString,changeNumToChinese} from '@/config/utils'


export const filter = (Vue) => {
  Vue.filter('timesToDate', (times, pattern) => {//时间戳转日期
    if (!pattern) {
      pattern = 'yyyy-MM-dd HH:mm';
    }
    if (times) {
      return timesToDate(times, pattern);
    } else {
      return '';
    }
  })
  Vue.filter('filterOrgType', (str) => {//数据级别
    var result = "";
    switch(str){
      case 'SYSTEM': result = '系统'; break;
      case 'PLAT': result = '平台'; break;
      case 'UNION': result = '公会'; break;
    }
    return result;
  })

  Vue.filter('reflectStatus', (str) => {//数据级别
    var result = "";
    switch(str){
      case 'WAITING_APPROVAL': result = '待审核'; break;
      case 'WAITING_PAY': result = '待打款'; break;
      case 'CASH_DONE': result = '提现成功'; break;
      case 'APPROVAL_REJECT': result = '申请拒绝'; break;
      case 'PAY_REJECT': result = '打款拒绝'; break;
    }
    return result;
  })

  Vue.filter('salaryStatus', (str) => {//薪资发放状态
    var result = "";
    switch(str){
      case 0: result = '待发放'; break;
      case 1: result = '已发放'; break;
      case 2: result = '拒绝发放'; break;
    }
    return result;
  })

  Vue.filter('filterAutoPay', (str) => {//代发工资
    var result = "";
    switch(str){
      case 0: result = '手动'; break;
      case 1: result = '系统'; break;
    }
    return result;
  })

  Vue.filter('actorStatus', (str) => {//代发工资
    var result = "";
    switch(str){
      case 0: result = '已启用'; break;
      case 1: result = '已停用'; break;
      case -1: result = '待编辑'; break;
    }
    return result;
  })

  Vue.filter('distributeStatus', (str) => {//艺人分配
    var result = "";
    switch(str){
      case 0: result = '未分配'; break;
      case 1: result = '已分配'; break;
    }
    return result;
  })
  Vue.filter('filterMoney', (money) => {//
    return money.toFixed(2);
  })
  



}
