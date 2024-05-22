import{j as t,B as x,i as f,l as g}from"./index-a6568d8d.js";import{S as P,a as N}from"./StyledLink-188a5bbb.js";import{u as v,M as o}from"./formik.esm-cae5f6b2.js";import{A as j,M as y}from"./MainLayout-9f6cec13.js";import{G as C}from"./Grid-bffb31d8.js";import{T as c,B as b}from"./Logo-be7a3653.js";import{c as S,a as h}from"./index.esm-355a721d.js";import"./createSvgIcon-636dfc46.js";const k=({name:a,avatar:n})=>{const i=n,l=a?a.charAt(0).toUpperCase():"";return t.jsx(x,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(j,{src:i,sx:{width:56,height:56,m:1},alt:`${a}'s avatar`,children:l})})},B=({initialValues:a,onSubmit:n,formTitle:i,submitButtonText:l,userProfile:d,bottomText:u,bottomLinkText:r,bottomLinkHref:m="/",validationSchema:w,passwordFieldProps:p})=>{const e=v({initialValues:a,onSubmit:s=>{n(s.firstName,s.lastName,s.email,s.oldPassword,s.newPassword,s.repeatPassword)},validationSchema:w});return t.jsxs(P,{onSubmit:e.handleSubmit,children:[t.jsxs(C,{item:!0,xs:12,container:!0,justifyContent:"space-between",children:[t.jsx(c,{component:"h1",variant:"h5",children:i}),d&&t.jsx(k,{name:d.name,avatar:d.avatar})]}),t.jsx(o,{id:"firstName",name:"firstName",label:"Imię",type:"text",autoComplete:"on",variant:"standard",value:e.values.firstName,onChange:e.handleChange,error:e.touched.firstName&&!!e.errors.firstName,helperText:e.touched.firstName&&e.errors.firstName,fullWidth:!0}),t.jsx(o,{id:"lastName",name:"lastName",label:"Nazwisko",type:"text",autoComplete:"on",variant:"standard",value:e.values.lastName,onChange:e.handleChange,error:e.touched.lastName&&!!e.errors.lastName,helperText:e.touched.lastName&&e.errors.lastName,fullWidth:!0}),t.jsx(o,{id:"email",name:"email",label:"Email",type:"email",autoComplete:"on",variant:"standard",value:e.values.email,onChange:e.handleChange,error:e.touched.email&&!!e.errors.email,helperText:e.touched.email&&e.errors.email,fullWidth:!0,disabled:!0}),t.jsx(o,{id:"oldPassword",name:"oldPassword",label:"Stare hasło",type:"password",autoComplete:"old-password",variant:"standard",value:e.values.oldPassword,onChange:e.handleChange,error:e.touched.oldPassword&&!!e.errors.oldPassword,helperText:e.touched.oldPassword&&e.errors.oldPassword,fullWidth:!0,...p}),t.jsx(o,{id:"newPassword",name:"newPassword",label:"Nowe hasło",type:"password",autoComplete:"new-password",variant:"standard",value:e.values.newPassword,onChange:e.handleChange,error:e.touched.newPassword&&!!e.errors.newPassword,helperText:e.touched.newPassword&&e.errors.newPassword,fullWidth:!0,...p}),t.jsx(o,{id:"repeatPassword",name:"repeatPassword",label:"Powtórz hasło",type:"password",autoComplete:"repeat-password",variant:"standard",value:e.values.repeatPassword,onChange:e.handleChange,error:e.touched.repeatPassword&&!!e.errors.repeatPassword,helperText:e.touched.repeatPassword&&e.errors.repeatPassword,fullWidth:!0,...p}),t.jsx(b,{variant:"contained",fullWidth:!0,type:"submit",children:l}),t.jsxs(c,{fontSize:"1rem",children:[u," ",t.jsx(N,{to:m,children:r})]})]})},T=S().shape({firstName:h().min(2,"Za krótkie imię"),lastName:h().min(2,"Za krótkie nazwisko"),email:h().email("Nieprawidłowy adres email"),password:h().min(8,"Min 8 znaków")}),z="https://ontrackbackendapi.azurewebsites.net/api",M=()=>{const{user:a,isLoggedIn:n,token:i}=f();if(console.log("user in MySettings",a),!n)return t.jsx("div",{children:"Please log in to edit your settings."});const l=async(d,u)=>{try{const r=await g.put(`${z}/user/me`,{firstName:d,lastName:u},{headers:{Authorization:`Bearer ${i}`}});console.log("User settings updated:",r.data)}catch(r){let m="Failed to update user settings: ";r instanceof Error&&(m=r.message),console.error(m)}};return t.jsx(B,{initialValues:{firstName:(a==null?void 0:a.firstName)??"",lastName:(a==null?void 0:a.lastName)??"",email:(a==null?void 0:a.email)??"",oldPassword:"",newPassword:"",repeatPassword:""},onSubmit:l,formTitle:"Moje ustawienia",submitButtonText:"Zapisz zmiany",userProfile:{name:`${a==null?void 0:a.firstName} ${a==null?void 0:a.lastName}`,avatar:(a==null?void 0:a.avatar)??""},validationSchema:T,passwordFieldProps:{InputLabelProps:{shrink:!0}}})},Z=()=>t.jsx("div",{children:t.jsx(y,{children:t.jsx(M,{})})});export{Z as default};