(this.webpackJsonpth57=this.webpackJsonpth57||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(16)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),s=a.n(i),l=(a(13),a(14),a(2)),h=a(3),c=a(1),u=a(5),o=a(4),d=(a(15),function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={value:n.props.value},n.handleChange=n.handleChange.bind(Object(c.a)(n)),n}return Object(h.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:this.props.id},r.a.createElement("label",{htmlFor:this.props.id},this.props.label,":"),r.a.createElement("input",{type:"text",id:this.props.id,name:this.props.id,value:this.state.value,onChange:this.handleChange}))}}]),a}(r.a.Component)),m=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={name:n.props.name,weight:n.props.weight,vest:n.props.vest},n.handleNameChange=n.handleNameChange.bind(Object(c.a)(n)),n.handleVestChange=n.handleVestChange.bind(Object(c.a)(n)),n.handleWeightChange=n.handleWeightChange.bind(Object(c.a)(n)),n}return Object(h.a)(a,[{key:"handleNameChange",value:function(e){this.setState({name:e.target.value})}},{key:"handleVestChange",value:function(e){var t;t="wet"===e.target.value?8:-8,this.setState({vest:e.target.value,weight:Number(this.state.weight)+t})}},{key:"handleWeightChange",value:function(e){this.setState({weight:Number(e.target.value)})}},{key:"render",value:function(){return r.a.createElement("div",{className:"instructor"},r.a.createElement("div",{className:"instructor-name"},r.a.createElement("label",{htmlFor:"instructor"},"Instructor:"),r.a.createElement("input",{type:"text",id:"instructor",name:"instructor",value:this.state.name,onChange:this.handleNameChange})),r.a.createElement("div",{className:"vest"},r.a.createElement("label",{htmlFor:"dry"},r.a.createElement("input",{type:"radio",id:"dry",name:"vest",value:"dry",checked:"dry"===this.state.vest,onChange:this.handleVestChange}),"Dry"),r.a.createElement("label",{htmlFor:"wet"},r.a.createElement("input",{type:"radio",id:"wet",name:"vest",value:"wet",checked:"wet"===this.state.vest,onChange:this.handleVestChange}),"Wet"),r.a.createElement("label",{htmlFor:"instructorWeight"},"Weight:"),r.a.createElement("input",{type:"number",id:"instructorWeight",name:"instructorWeight",value:this.state.weight,onChange:this.handleWeightChange})))}}]),a}(r.a.Component),g=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={name:n.props.name,weight:n.props.weight},n.handleWeightChange=n.handleWeightChange.bind(Object(c.a)(n)),n.handleNameChange=n.handleNameChange.bind(Object(c.a)(n)),n}return Object(h.a)(a,[{key:"handleWeightChange",value:function(e){this.setState({weight:Number(e.target.value)})}},{key:"handleNameChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:"student"},r.a.createElement("div",{className:"student-name"},r.a.createElement("label",{htmlFor:"studentName"},"Student:"),r.a.createElement("input",{type:"text",id:"studentName",name:"studentName",value:this.state.name,onChange:this.handleNameChange})),r.a.createElement("div",{className:"student-weight"},r.a.createElement("label",{htmlFor:"studentWeight"},"Weight:"),r.a.createElement("input",{type:"number",id:"studentWeight",name:"studentWeight",value:this.state.weight,onChange:this.handleWeightChange})))}}]),a}(r.a.Component),v=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={side:e.aircraft,spot:e.spot},n.handleSpotChange=n.handleSpotChange.bind(Object(c.a)(n)),n.handleSideChange=n.handleSideChange.bind(Object(c.a)(n)),n}return Object(h.a)(a,[{key:"handleSpotChange",value:function(e){this.setState({spot:e.target.value})}},{key:"handleSideChange",value:function(e){this.setState({side:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:"aircraft"},r.a.createElement("label",{htmlFor:"side"},"Aircraft:"),r.a.createElement("input",{type:"text",id:"side",name:"side",value:this.state.side,onChange:this.handleSideChange}),r.a.createElement("label",{htmlFor:"spot"},"Spot:"),r.a.createElement("input",{type:"text",id:"spot",name:"spot",value:this.state.spot,onChange:this.handleSpotChange}))}}]),a}(r.a.Component),p=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={eventName:"C4001",aircraft:"123",spot:"H/S",curwx:"BKN008",fcst:"SKC",instructorName:"Egan",instructorVest:"dry",instructorWt:210,studName:"I. M. Stud",studWt:195,mxTmp:31,pa:124,da:1689,date:(new Date).toDateString()},n}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"form"},r.a.createElement("div",{className:"left-header header"},r.a.createElement(d,{label:"Event",value:this.state.eventName,id:"fltEvent"}),r.a.createElement(m,{name:this.state.instructorName,vest:this.state.instructorVest,weight:this.state.instructorWt}),r.a.createElement(v,{aircraft:this.state.aircraft,spot:this.state.spot}),r.a.createElement(d,{label:"Current Wx",value:this.state.curwx,id:"curwx"}),r.a.createElement(d,{label:"Forecast Wx",value:this.state.fcst,id:"fcst"})),r.a.createElement("div",{className:"right-header header"},r.a.createElement(d,{label:"Date",value:this.state.date,id:"date"}),r.a.createElement(g,{name:this.state.studName,weight:this.state.studWt}),r.a.createElement(d,{label:"Max Temp",value:this.state.mxTmp,id:"mxTmp"}),r.a.createElement(d,{label:"Max PA",value:this.state.pa,id:"pa"}),r.a.createElement(d,{label:"Max DA",value:this.state.da,id:"da"})))}}]),a}(r.a.Component);var b=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},"TH-57 Weight and Balance"),r.a.createElement(p,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.7c301284.chunk.js.map