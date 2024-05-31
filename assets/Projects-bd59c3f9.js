import{j as e,B as f,C as S,i as q,r as o,q as V,k as Z,p as H}from"./index-c79e8087.js";import{A as R,M as Q}from"./MainLayout-5b65dc03.js";import{u as N,B as J}from"./ProjectStore-0ec5223f.js";import{u as K,S as T,I as X,a as _,b as ee,G as te,C as se,M as ne,c as ae,d as ie,D as re,O as oe,e as le,A as de,N as ce}from"./NoContent-dfc96317.js";import{T as u}from"./Button-d362f979.js";import{r as ue,i as me,I as G}from"./createSvgIcon-7c2d8988.js";import{D as xe,C as he,a as fe,d as pe}from"./CloseButton-0b83b7b5.js";import{c as ge,a as je,u as be}from"./index.esm-f6b22d87.js";import{D as ye}from"./DialogTitle-f20d710d.js";import{G as d}from"./Grid-e612bf40.js";import{u as Ce}from"./Logo-c74f2329.js";import{u as ke}from"./useMediaQuery-0140dc33.js";const ve="/OnTrack.Frontend.React/assets/TasksIcon-00eb2292.svg",Ie=({value:s,size:p=100,...n})=>e.jsxs(f,{sx:{position:"relative",display:"inline-flex"},children:[e.jsx(S,{variant:"determinate",value:100,size:p,sx:{color:"#5E5F7D",...n.sx}}),e.jsx(S,{variant:"determinate",value:s,size:p,sx:{position:"absolute",left:0,...n.sx}}),e.jsx(f,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(u,{variant:"caption",component:"div",color:"primary.main",fontSize:"1.75rem",children:`${Math.round(s)}%`})})]});var L={},Se=me;Object.defineProperty(L,"__esModule",{value:!0});var U=L.default=void 0,Me=Se(ue()),Pe=e,we=(0,Me.default)((0,Pe.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");U=L.default=we;const De="https://ontrackbackendapi2.azurewebsites.net/api",Be=ge({title:je().trim().min(1,"Tytuł projektu musi zawierać co najmniej 1 znak.").required("Tytuł projektu jest wymagany.")});function Y({isOpen:s,handleClose:p,project:n,mode:m}){var E,$,O,B;const{addProject:y,updateProject:M}=N(),{user:c,token:C}=q(),[a,l]=o.useState([]),[k,b]=o.useState(null),[P,x]=o.useState(!1),{searchMemberRef:g,members:w,isLoadingMembers:v,handleSearchChange:W,clearSearchInput:D}=K(!0,a);o.useEffect(()=>{s&&(async()=>{var i;if(x(!0),m==="edit"&&((i=n==null?void 0:n.memberIds)!=null&&i.length))try{const r=await V.get(`${De}/user/by/ids/${n.memberIds.join(",")}`,{headers:{Authorization:`Bearer ${C}`}});l(r.data)}catch(r){console.error("Error fetching project members:",r)}else l([]);x(!1)})()},[s,m,n,C]);const F=t=>{if(!a.find(i=>i.id===t.id)){const i=[...a,t];l(i),console.log("Selected members:",i),h.setFieldValue("memberIds",i.map(r=>r.id)),D()}},A=t=>{if(a.length===1){b("Projekt musi mieć co najmniej jednego członka.");return}const i=a.filter(r=>r.id!==t);l(i),h.setFieldValue("memberIds",i.map(r=>r.id))},h=be({initialValues:{title:(n==null?void 0:n.title)??"",description:(n==null?void 0:n.description)??"",memberIds:m==="edit"?a.map(t=>t.id):[]},validationSchema:Be,onSubmit:async(t,{setSubmitting:i,resetForm:r})=>{const z={...n,title:t.title,description:t.description,memberIds:t.memberIds};console.log("Submitting data:",z);try{m==="add"?(await y({...z,memberIds:a.filter(j=>j.id!==void 0).map(j=>j.id)}),console.log("Adding project:",z)):m==="edit"&&(n!=null&&n.id)&&(await M(n.id,{...z,memberIds:a.filter(j=>j.id!==void 0).map(j=>j.id)}),console.log("Project updated:",z)),r(),D(),l([]),b(null),p()}catch(j){console.error("Error submitting the project:",j)}finally{i(!1)}},enableReinitialize:!0}),I=()=>{h.resetForm(),D(),l([]),b(null),p()};return e.jsxs(xe,{fullWidth:!0,maxWidth:"md",open:s,onClose:I,PaperProps:{sx:{overflowY:"auto",maxWidth:"500px"}},children:[e.jsx(ye,{sx:{textAlign:"center",fontWeight:600,fontSize:"17px",color:"#5F5B5B",mt:2},children:m==="add"?"Dodaj projekt":"Edytuj projekt"}),e.jsx(he,{onClick:I,right:20,top:20}),e.jsxs("form",{onSubmit:h.handleSubmit,children:[e.jsxs(fe,{sx:{paddingBottom:12},children:[e.jsx(u,{variant:"body1",sx:{color:"#5F5B5B",fontWeight:600},children:"Nazwa projektu"}),e.jsx(T,{fullWidth:!0,variant:"filled",name:"title",value:h.values.title,onChange:h.handleChange,placeholder:"Wpisz nazwę projektu",sx:{width:300}}),h.touched.title&&h.errors.title?e.jsx(u,{color:"error",variant:"caption",children:h.errors.title}):null,e.jsx(u,{mt:2,variant:"body1",sx:{color:"#5F5B5B",fontWeight:600},children:"Członkowie"}),e.jsx(T,{fullWidth:!0,variant:"filled",placeholder:"Wyszukaj członków",sx:{width:300},inputRef:g,onChange:W,endAdornment:e.jsx(X,{position:"end",children:e.jsx(U,{})})}),((E=g.current)==null?void 0:E.value)&&w.length===0&&!v&&e.jsx(u,{color:"textSecondary",variant:"body2",children:"Brak wyników"}),(($=g.current)==null?void 0:$.value)&&v&&e.jsx(f,{display:"flex",justifyContent:"center",mt:2,children:e.jsx(S,{})}),!((O=g.current)!=null&&O.value)&&v&&e.jsx(f,{display:"flex",justifyContent:"center",mt:2,children:e.jsx(S,{})}),!v&&e.jsxs(e.Fragment,{children:[((B=g.current)==null?void 0:B.value)&&w.map(t=>e.jsxs(f,{sx:{display:"flex",alignItems:"center",gap:2,mt:2,borderRadius:"5px",transition:"background-color 0.4s ease-in-out",":hover":{cursor:"pointer",backgroundColor:"#f0f0f0"}},onClick:()=>F(t),children:[e.jsx(R,{alt:`${t.firstName} ${t.lastName}`}),e.jsxs(u,{children:[t.firstName," ",t.lastName]})]},t.id)),P?e.jsx(f,{display:"flex",justifyContent:"center",mt:2,children:e.jsx(S,{})}):e.jsx(f,{mt:4,sx:{maxHeight:a.length>2?"100px":"auto",overflowY:a.length>2?"scroll":"visible"},children:a.map(t=>e.jsxs(f,{sx:{display:"flex",alignItems:"center",gap:2,mt:1},children:[e.jsx(R,{alt:`${t.firstName} ${t.lastName}`}),e.jsxs(u,{children:[t.firstName," ",t.lastName]}),t.id!==(c==null?void 0:c.id)&&e.jsx(G,{onClick:()=>A(t.id??""),children:e.jsx(pe,{})})]},t.id))})]}),k&&e.jsx(u,{color:"error",variant:"caption",children:k})]}),e.jsxs(f,{sx:{display:"flex",justifyContent:"flex-end",mt:2,position:"absolute",bottom:36,right:26},children:[e.jsx(_,{type:"submit",variant:"contained",sx:{marginRight:2},children:"Zapisz"}),e.jsx(_,{type:"button",variant:"contained",sx:{backgroundColor:"#5E5F7D"},onClick:I,children:"Anuluj"})]})]})]})}const ze="https://ontrackbackendapi2.azurewebsites.net/api",Fe=({project:s,isEditClicked:p})=>{var B;const n=Z(),{projectProgress:m}=N(),y=s.id&&m[s.id]||0,[M,c]=o.useState(!1),[C,a]=o.useState(null),[l,k]=o.useState(!1),[b,P]=o.useState([]),[x,g]=o.useState(!1),{requestDelete:w,confirmDelete:v,isConfirmOpen:W,closeModal:D}=ee(),F=((B=s==null?void 0:s.taskIds)==null?void 0:B.length)??0,{token:A}=q();o.useEffect(()=>{(async()=>{var i;if(g(!0),(i=s==null?void 0:s.memberIds)!=null&&i.length)try{const r=await V.get(`${ze}/user/by/ids/${s.memberIds.join(",")}`,{headers:{Authorization:`Bearer ${A}`}});P(r.data)}catch(r){console.error("Error fetching project members:",r)}g(!1)})()},[s,A]);const h=t=>{t.stopPropagation(),a(t.currentTarget),c(!0)},I=o.useCallback(t=>{t.stopPropagation(),c(!1),s&&w({id:s.id,type:"project"},N.getState().deleteProject)},[s,w]),E=o.useCallback(t=>{t.stopPropagation(),c(!1),k(!0)},[]),$=()=>{k(!1)},O=()=>{n(`/projects/${s==null?void 0:s.id}/tasks`)};return e.jsxs(e.Fragment,{children:[e.jsxs(te,{onClick:O,sx:{width:"400px",position:"relative"},children:[e.jsx(G,{"aria-label":"more options",sx:{position:"absolute",top:8,right:8},onClick:t=>{t.stopPropagation(),p?I(t):h(t)},children:p?e.jsx("img",{src:se,alt:"Usuń"}):e.jsx("img",{src:ne,alt:"Więcej opcji"})}),e.jsxs(d,{container:!0,direction:"row",spacing:2,alignItems:"center",justifyContent:"space-between",children:[e.jsxs(d,{item:!0,xs:7,children:[e.jsx(d,{item:!0,xs:12,mb:2,alignItems:"center",children:e.jsx(u,{children:s==null?void 0:s.title})}),e.jsx(d,{item:!0,xs:12,children:e.jsx(ae,{spacing:2,mb:2,sx:{"& > :not(style) ~ :not(style)":{mt:0}},children:x?e.jsx(f,{display:"flex",justifyContent:"center",mt:2,children:e.jsx(S,{})}):b.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(u,{variant:"subtitle2",color:"text.secondary",children:"Zespół"}),e.jsx(ie,{members:b})," "]})})}),e.jsx(d,{item:!0,xs:12,children:e.jsx(d,{item:!0,xs:!0,children:(s==null?void 0:s.dueDate)&&e.jsx(re,{date:s.dueDate})})})]}),e.jsxs(d,{item:!0,alignItems:"center",justifyContent:"space-between",xs:4,children:[e.jsx(d,{item:!0,xs:!0,container:!0,justifyContent:"center",children:e.jsx(Ie,{value:y})}),e.jsxs(d,{item:!0,xs:12,mt:2,container:!0,alignItems:"center",justifyContent:"center",children:[e.jsx("img",{src:ve,alt:"Tasks"}),e.jsx(u,{variant:"subtitle2",color:"text.secondary",ml:1,children:`${F??0} ${F===1?"zadanie":"zadań"}`})]})]}),e.jsx(d,{})]}),e.jsx(oe,{open:M,anchorEl:C,onClose:()=>c(!1),onEdit:t=>E(t),onDelete:I}),e.jsx(le,{isOpen:W,onDeleteConfirm:v,onClose:D,itemName:s==null?void 0:s.title,itemType:"project"})]}),e.jsx(Y,{isOpen:l,handleClose:$,project:s,mode:"edit"})]})};function Ae(){const[s,p]=o.useState(!1),[n,m]=o.useState(!1),y=Ce(),M=ke(y.breakpoints.down("md")),{projects:c,fetchUserProjects:C,loading:a,error:l}=N();o.useEffect(()=>{C()},[C]);const k=x=>{x.stopPropagation(),p(g=>!g)};function b(){m(!1)}const P=x=>{x.stopPropagation(),m(!0)};return e.jsxs(e.Fragment,{children:[e.jsxs(d,{container:!0,spacing:2,alignItems:"baseline",justifyContent:"space-between",children:[e.jsx(d,{item:!0,children:e.jsx(J,{leftButtonLabel:"Projekty",rightButtonLabel:"Wykres",leftButtonLink:"/projects",rightButtonLink:"/wykres"})}),e.jsx(de,{handleAdd:P,handleEditAll:k,children:"Projekt"})]}),a&&e.jsx(H,{}),l&&e.jsx(f,{sx:{display:"flex",justifyContent:"center",mt:4},children:e.jsx(u,{color:"error",children:l})}),!a&&!l&&c.length===0&&e.jsx(ce,{type:"project"}),!a&&!l&&c.length>0&&e.jsx(d,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{flexDirection:M?"column":"row",[y.breakpoints.up("md")]:{alignItems:"flex-start"},[y.breakpoints.down("md")]:{alignItems:"center"}},children:c.map(x=>e.jsx(Fe,{project:x,isEditClicked:s},x.id))}),e.jsx(Y,{isOpen:n,handleClose:b,mode:"add"})]})}const Ue=()=>e.jsx(e.Fragment,{children:e.jsx(Q,{children:e.jsx(Ae,{})})});export{Ue as default};
