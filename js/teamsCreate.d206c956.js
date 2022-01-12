(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["teamsCreate"],{"1c07":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("pageHeader",{attrs:{title:"Nuovo Team",routes:[{to:{name:"Teams"},text:"Gestione teams"}],resource:"crea nuovo team"}}),r("form",{staticClass:"bg-white mb-4 p-4 rounded-lg shadow-custom",on:{submit:function(t){return t.preventDefault(),e.storeTeam.apply(null,arguments)}}},[r("errorMessage",{attrs:{errors:e.errors}}),r("baseInput",{staticClass:"mb-4",attrs:{label:"Nome *",type:"text",name:"name"},model:{value:e.team.name,callback:function(t){e.$set(e.team,"name",t)},expression:"team.name"}}),r("baseInput",{staticClass:"mb-4 max-w-max",attrs:{label:"Colore",type:"color",name:"color"},model:{value:e.team.color,callback:function(t){e.$set(e.team,"color",t)},expression:"team.color"}}),r("div",{staticClass:"mb-8"},[r("label",{staticClass:"text-sm text-gray-400 block",attrs:{for:"description"}},[e._v("Descrizione")]),r("vue-editor",{attrs:{"editor-toolbar":e.customToolbar,placeholder:"Inserisci una descrizione per questo team..."},model:{value:e.team.description,callback:function(t){e.$set(e.team,"description",t)},expression:"team.description"}})],1),r("baseButton",{attrs:{text:"Salva"}})],1)],1)},s=[],n=r("6a0d"),l=r("dff9"),o=r("d1b8"),i=r("7f6e"),u=r("5dbc"),c=r("5873"),d={name:"Dashboard.Teams.create",components:{pageHeader:n["a"],baseInput:l["a"],baseSelectInput:o["a"],baseButton:i["a"],errorMessage:u["a"],VueEditor:c["a"]},watch:{$route:{handler:function(){this.clearErrors()},deep:!0,immediate:!0}},data:function(){return{team:{name:"",color:"",description:""},customToolbar:[[{header:[!1,1,2,3,4,5,6]}],["bold","italic","underline","strike"],[{align:""},{align:"center"},{align:"right"},{align:"justify"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],["link"],["clean"]]}},computed:{errors:function(){return this.$store.getters["teams/errors"]}},methods:{storeTeam:function(){this.$store.dispatch("teams/storeTeam",{team:this.team})},clearErrors:function(){this.$store.dispatch("teams/clearErrors")}}},p=d,m=r("2877"),f=Object(m["a"])(p,a,s,!1,null,null,null);t["default"]=f.exports},"5dbc":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return 0!=e.errors.length?r("div",{class:{"bg-red-100 rounded p-2 mb-4 flex space-x-2":0!=e.errors.length}},[r("svg",{staticClass:"text-red-500 flex-none w-5 h-5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[r("path",{attrs:{fill:"currentColor",d:"M12,16a1,1,0,1,0,1,1A1,1,0,0,0,12,16Zm10.67,1.47-8.05-14a3,3,0,0,0-5.24,0l-8,14A3,3,0,0,0,3.94,22H20.06a3,3,0,0,0,2.61-4.53Zm-1.73,2a1,1,0,0,1-.88.51H3.94a1,1,0,0,1-.88-.51,1,1,0,0,1,0-1l8-14a1,1,0,0,1,1.78,0l8.05,14A1,1,0,0,1,20.94,19.49ZM12,8a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V9A1,1,0,0,0,12,8Z"}})]),r("div",e._l(e.errors,(function(t,a){return r("div",{key:a,staticClass:"text-red-500 text-sm"},[e._v(" "+e._s(t[0])+" ")])})),0)]):e._e()},s=[],n={name:"Layouts.errorMessage",props:{errors:{type:[Array,Object],required:!0}}},l=n,o=r("2877"),i=Object(o["a"])(l,a,s,!1,null,null,null);t["a"]=i.exports},"6a0d":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",{staticClass:"mb-6",class:{"flex items-baseline space-x-4":e.routes}},[r("h2",{staticClass:"text-xl text-gray-700"},[e._v(" "+e._s(e.title)+" ")]),e.routes?r("section",{staticClass:"flex items-center space-x-0.5 text-sm"},[e._l(e.routes,(function(t,a){return r("div",{key:a,staticClass:"flex items-center space-x-0.5"},[r("router-link",{staticClass:"text-gray-400 hover:text-gray-500 transition",attrs:{to:t.to}},[e._v(" "+e._s(t.text)+" ")]),r("svg",{staticClass:"w-4 h-4 flex-none text-gray-400 mt-0.5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"}},[r("path",{attrs:{fill:"currentColor",d:"M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"}})])],1)})),r("span",{staticClass:"text-indigo-400"},[e._v(e._s(e.resource))])],2):e._e()])},s=[],n={name:"Layouts.pageHeader",props:{title:{type:String,default:"Header"},routes:{type:Array,required:!1},resource:{type:String,default:null,required:!1}}},l=n,o=r("2877"),i=Object(o["a"])(l,a,s,!1,null,null,null);t["a"]=i.exports},"7f6e":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{staticClass:"bg-gradient-to-r from-indigo-400 to-purple-400 transition text-white rounded px-3 py-1.5 text-sm relative",class:{"flex justify-center items-center space-x-4":e.svg},attrs:{type:e.type}},[r("span",[e._v(e._s(e.text))]),e.svg&&e.loading?r("div",{staticClass:"absolute right-24",domProps:{innerHTML:e._s(e.svg)}}):e._e()])},s=[],n={name:"Layouts.baseButton",props:{text:{type:String,default:"Submit"},type:{type:String,default:"submit"},svg:{type:String,required:!1},loading:{type:Boolean,required:!1}}},l=n,o=r("2877"),i=Object(o["a"])(l,a,s,!1,null,null,null);t["a"]=i.exports},d1b8:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.label?r("label",{staticClass:"text-sm text-gray-400",attrs:{for:e.name}},[e._v(" "+e._s(e.label)+" ")]):e._e(),r("select",{staticClass:"text-gray-500 px-2 py-1.5 text-sm rounded-lg focus:outline-none border focus:border-gray-300 transition w-full",attrs:{name:e.name},on:{input:e.updateValue}},[e.text?r("option",{attrs:{value:""}},[e._v(e._s(e.text))]):e._e(),e._l(e.values,(function(t,a){return r("option",{key:a,domProps:{value:t}},[e._v(" "+e._s(t)+" ")])}))],2)])},s=[],n={name:"Layouts.baseSelectInput",props:{name:{type:String,required:!0},text:{type:String,required:!1},values:{type:Array,required:!0},label:{type:String,default:null,required:!1}},methods:{updateValue:function(e){return this.$emit("input",e.target.value)}}},l=n,o=r("2877"),i=Object(o["a"])(l,a,s,!1,null,null,null);t["a"]=i.exports},dff9:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.label?r("label",{staticClass:"text-xs text-gray-400",attrs:{for:e.name}},[e._v(" "+e._s(e.label)+" ")]):e._e(),r("input",{staticClass:"border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400",class:{"pl-8":"search"==e.type},attrs:{type:e.type,name:e.name,required:e.required,placeholder:e.placeholder},on:{input:e.updateValue}})])},s=[],n={name:"Layouts.baseInput",props:{type:{type:String,default:"text"},name:{type:String,required:!0},label:{type:String,default:null,required:!1},required:{type:String,default:null,required:!1},placeholder:{type:String,default:null,required:!1}},methods:{updateValue:function(e){return this.$emit("input",e.target.value)}}},l=n,o=r("2877"),i=Object(o["a"])(l,a,s,!1,null,null,null);t["a"]=i.exports}}]);
//# sourceMappingURL=teamsCreate.d206c956.js.map