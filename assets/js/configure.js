"use strict";Vue.use(VeeValidate,{enableAutoClasses:!0,classNames:{touched:"is-touched",untouched:"is-untouched",valid:"is-valid",invalid:"is-invalid",pristine:"is-pristine",dirty:"is-dirty"}}),jQuery(document).ready(function(t){new Vue({el:"main",data:{loading:!1,state:"welcome",syscheck:{ok:!1,error:"",results:[]},dbcheck:{ok:!1,error:""},gitcheck:{ok:!1,error:""},final:{ok:!1,error:"",results:[]},conf:{title:"Wiki",host:"http://",port:80,lang:"en",db:"mongodb://localhost:27017/wiki",pathData:"./data",pathRepo:"./repo",gitUseRemote:!0,gitUrl:"",gitBranch:"master",gitAuthType:"ssh",gitAuthSSHKey:"",gitAuthUser:"",gitAuthPass:"",gitAuthSSL:!0,gitSignatureName:"",gitSignatureEmail:"",adminEmail:"",adminPassword:"",adminPasswordConfirm:""},considerations:{https:!1,port:!1,localhost:!1}},computed:{currentProgress:function(){var t="0%";switch(this.state){case"welcome":t="0%";break;case"syscheck":t=this.syscheck.ok?"15%":"5%";break;case"general":t="20%";break;case"considerations":t="30%";break;case"db":t="35%";break;case"dbcheck":t=this.dbcheck.ok?"50%":"40%";break;case"paths":t="55%";break;case"git":t="60%";break;case"gitcheck":t=this.gitcheck.ok?"75%":"65%";break;case"admin":t="80%"}return t}},methods:{proceedToWelcome:function(t){this.state="welcome",this.loading=!1},proceedToSyscheck:function(t){var e=this;this.state="syscheck",this.loading=!0,e.syscheck={ok:!1,error:"",results:[]},_.delay(function(){axios.post("/syscheck").then(function(t){t.data.ok===!0?(e.syscheck.ok=!0,e.syscheck.results=t.data.results):(e.syscheck.ok=!1,e.syscheck.error=t.data.error),e.loading=!1,e.$nextTick()}).catch(function(t){window.alert(t.message)})},1e3)},proceedToGeneral:function(t){var e=this;e.state="general",e.loading=!1,e.$nextTick(function(){e.$validator.validateAll("general")})},proceedToConsiderations:function(t){this.considerations={https:!_.startsWith(this.conf.host,"https"),port:!1,localhost:_.includes(this.conf.host,"localhost")},this.state="considerations",this.loading=!1},proceedToDb:function(t){var e=this;e.state="db",e.loading=!1,e.$nextTick(function(){e.$validator.validateAll("db")})},proceedToDbcheck:function(t){var e=this;this.state="dbcheck",this.loading=!0,e.dbcheck={ok:!1,error:""},_.delay(function(){axios.post("/dbcheck",{db:e.conf.db}).then(function(t){t.data.ok===!0?e.dbcheck.ok=!0:(e.dbcheck.ok=!1,e.dbcheck.error=t.data.error),e.loading=!1,e.$nextTick()}).catch(function(t){window.alert(t.message)})},1e3)},proceedToPaths:function(t){var e=this;e.state="paths",e.loading=!1,e.$nextTick(function(){e.$validator.validateAll("paths")})},proceedToGit:function(t){var e=this;e.state="git",e.loading=!1,e.$nextTick(function(){e.$validator.validateAll("git")})},proceedToGitCheck:function(t){var e=this;this.state="gitcheck",this.loading=!0,e.gitcheck={ok:!1,results:[],error:""},_.delay(function(){axios.post("/gitcheck",e.conf).then(function(t){t.data.ok===!0?(e.gitcheck.ok=!0,e.gitcheck.results=t.data.results):(e.gitcheck.ok=!1,e.gitcheck.error=t.data.error),e.loading=!1,e.$nextTick()}).catch(function(t){window.alert(t.message)})},1e3)},proceedToAdmin:function(t){var e=this;e.state="admin",e.loading=!1,e.$nextTick(function(){e.$validator.validateAll("admin")})},proceedToFinal:function(t){var e=this;e.state="final",e.loading=!0,e.final={ok:!1,error:"",results:[]},_.delay(function(){axios.post("/finalize",e.conf).then(function(t){t.data.ok===!0?(e.final.ok=!0,e.final.results=t.data.results):(e.final.ok=!1,e.final.error=t.data.error),e.loading=!1,e.$nextTick()}).catch(function(t){window.alert(t.message)})},1e3)},finish:function(t){}}})});