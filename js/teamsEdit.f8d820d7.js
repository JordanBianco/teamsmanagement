(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["teamsEdit"],{"5dbc":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return 0!=t.errors.length?r("div",{class:{"bg-red-100 rounded p-2 mb-4 flex space-x-2":0!=t.errors.length}},[r("svg",{staticClass:"text-red-500 flex-none w-5 h-5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[r("path",{attrs:{fill:"currentColor",d:"M12,16a1,1,0,1,0,1,1A1,1,0,0,0,12,16Zm10.67,1.47-8.05-14a3,3,0,0,0-5.24,0l-8,14A3,3,0,0,0,3.94,22H20.06a3,3,0,0,0,2.61-4.53Zm-1.73,2a1,1,0,0,1-.88.51H3.94a1,1,0,0,1-.88-.51,1,1,0,0,1,0-1l8-14a1,1,0,0,1,1.78,0l8.05,14A1,1,0,0,1,20.94,19.49ZM12,8a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V9A1,1,0,0,0,12,8Z"}})]),r("div",t._l(t.errors,(function(e,s){return r("div",{key:s,staticClass:"text-red-500 text-sm"},[t._v(" "+t._s(e[0])+" ")])})),0)]):t._e()},a=[],o={name:"Layouts.errorMessage",props:{errors:{type:[Array,Object],required:!0}}},n=o,i=r("2877"),l=Object(i["a"])(n,s,a,!1,null,null,null);e["a"]=l.exports},"6a0d":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"mb-6",class:{"flex items-baseline space-x-4":t.routes}},[r("h2",{staticClass:"text-xl text-gray-700"},[t._v(" "+t._s(t.title)+" ")]),t.routes?r("section",{staticClass:"flex items-center space-x-0.5 text-sm"},[t._l(t.routes,(function(e,s){return r("div",{key:s,staticClass:"flex items-center space-x-0.5"},[r("router-link",{staticClass:"text-gray-400 hover:text-gray-500 transition",attrs:{to:e.to}},[t._v(" "+t._s(e.text)+" ")]),r("svg",{staticClass:"w-4 h-4 flex-none text-gray-400 mt-0.5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[r("path",{attrs:{fill:"currentColor",d:"M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"}})])],1)})),r("span",{staticClass:"text-indigo-400"},[t._v(t._s(t.resource))])],2):t._e()])},a=[],o={name:"Layouts.pageHeader",props:{title:{type:String,default:"Header"},routes:{type:Array,required:!1},resource:{type:String,default:null,required:!1}}},n=o,i=r("2877"),l=Object(i["a"])(n,s,a,!1,null,null,null);e["a"]=l.exports},"7f6e":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("button",{staticClass:"bg-gradient-to-r from-indigo-400 to-purple-400 transition text-white rounded px-3 py-1.5 text-sm relative",class:{"flex justify-center items-center space-x-4":t.svg},attrs:{type:t.type}},[r("span",[t._v(t._s(t.text))]),t.svg&&t.loading?r("div",{staticClass:"absolute right-24",domProps:{innerHTML:t._s(t.svg)}}):t._e()])},a=[],o={name:"Layouts.baseButton",props:{text:{type:String,default:"Submit"},type:{type:String,default:"submit"},svg:{type:String,required:!1},loading:{type:Boolean,required:!1}}},n=o,i=r("2877"),l=Object(i["a"])(n,s,a,!1,null,null,null);e["a"]=l.exports},"8a0b":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.team?r("div",[r("pageHeader",{attrs:{title:"Modifica Team",routes:[{to:{name:"Teams"},text:"Gestione Teams"},{to:{name:"Teams.show",params:{slug:t.team.slug}},text:t.team.name}],resource:"modifica"}}),r("form",{staticClass:"bg-white mb-4 p-4 rounded-lg shadow-custom",on:{submit:function(e){return e.preventDefault(),t.updateTeam.apply(null,arguments)}}},[r("errorMessage",{attrs:{errors:t.errors}}),r("div",{staticClass:"mb-4"},[r("label",{staticClass:"text-sm text-gray-400 block",attrs:{for:"name"}},[t._v("Nome *")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.team.name,expression:"team.name"}],staticClass:"border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400",attrs:{name:"name",type:"text"},domProps:{value:t.team.name},on:{input:function(e){e.target.composing||t.$set(t.team,"name",e.target.value)}}})]),r("div",{staticClass:"mb-4"},[r("label",{staticClass:"text-sm text-gray-400 block",attrs:{for:"color"}},[t._v("Color")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.team.color,expression:"team.color"}],staticClass:"border border-gray-200 rounded-lg px-2 py-1.5 text-sm transition focus:outline-none focus:border-gray-400",attrs:{name:"color",type:"color"},domProps:{value:t.team.color},on:{input:function(e){e.target.composing||t.$set(t.team,"color",e.target.value)}}})]),r("div",{staticClass:"mb-8"},[r("label",{staticClass:"text-sm text-gray-400 block",attrs:{for:"description"}},[t._v("Descrizione")]),r("vue-editor",{attrs:{"editor-toolbar":t.customToolbar,placeholder:"Inserisci una descrizione per questo team..."},model:{value:t.team.description,callback:function(e){t.$set(t.team,"description",e)},expression:"team.description"}})],1),r("baseButton",{attrs:{text:"Salva"}})],1)],1):t._e()])},a=[],o=r("6a0d"),n=r("5dbc"),i=r("7f6e"),l=r("5873"),u={name:"Dashboard.Users.Edit",props:{slug:{type:String,required:!0}},components:{pageHeader:o["a"],errorMessage:n["a"],baseButton:i["a"],VueEditor:l["a"]},mounted:function(){this.getTeam()},watch:{$route:{handler:function(){this.clearErrors()},deep:!0,immediate:!0}},data:function(){return{customToolbar:[[{header:[!1,1,2,3,4,5,6]}],["bold","italic","underline","strike"],[{align:""},{align:"center"},{align:"right"},{align:"justify"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],["link"],["clean"]]}},computed:{team:function(){return this.$store.getters["teams/team"]},errors:function(){return this.$store.getters["teams/errors"]}},methods:{getTeam:function(){this.$store.dispatch("teams/getTeam",{slug:this.slug})},updateTeam:function(){this.$store.dispatch("teams/updateTeam",{team:this.team})},clearErrors:function(){this.$store.dispatch("teams/clearErrors")}}},c=u,m=r("2877"),d=Object(m["a"])(c,s,a,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=teamsEdit.f8d820d7.js.map