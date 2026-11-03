// pantalla actual/rol del usuario, pestaña activa y el historial de alertas.
const state = {
  screen: 'splash',
  role: null,
  homeTab: 'home',
  alertConfirmed: false,
  codeAttemptWrong: false,
  adminSession: false,
  history: [
    {title:'LLUVIA EXTREMA', risk:'Riesgo alto', date:'01/06/2026'},
    {title:'TEMPERATURA', risk:'Sin riesgo', date:'01/05/2026'},
    {title:'VIENTO', risk:'Riesgo Medio', date:'01/04/2026'},
  ],
};

// USUARIOS PERMITIDOS
const CREDENTIALS = {
  admin: { password:'123', role:'admin' },
  productor: { password:'1234', role:'productor' },
};

// NAVEGACIÓN
function go(screen){ state.screen = screen; render(); }
function setTab(tab){ state.homeTab = tab; render(); }

// MENSAJE EMERGENTE
// Muestra un aviso corto en la parte de arriba y lo oculta
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>t.classList.remove('show'), 1800);
}

// BARRA SUPERIOR
// Dibuja la barra con la hora que va arriba de las pantallas.
function statusbar(dark){
  return `<div class="statusbar" style="color:${dark? '#132A44':'#fff'}">
    <span>07:00</span>
  </div>`;
}

// PANTALLA DE INICIO
// Primera pantalla: nombre de la app, imagen y botón para continuar al login.
function screenSplash(){
  return `
  <div class="auth-wrap" style="background:var(--sky-mid); align-items:center; justify-content:center; text-align:center; padding:24px 30px;">
    <h1 style="font-family:var(--font-display); font-size:32px; text-decoration:underline; color:var(--ink); margin-bottom:16px;">AGROALERTAS</h1>
    <img src="assets/inicio.png" alt="AgroAlertas" style="width:150px; height:150px; object-fit:contain; margin-bottom:16px;">
    <button class="btn btn-skyblue" style="max-width:220px; margin-bottom:16px;" onclick="go('login')">Seguir</button>
    <img src="assets/login.png" alt="viento" style="width:80px; height:auto; object-fit:contain;">
  </div>`;
}

// PANTALLA DE LOGIN
// Formulario para iniciar sesión
function screenLogin(){
  return `
  ${statusbar(true)}
  <div class="auth-wrap">
    <div class="auth-top"><span class="auth-back" onclick="go('splash')">‹</span></div>
    <div class="auth-hero">
      <h1>¡BIENVENIDO!</h1>
      <span class="hero-img"><img src="assets/registro.png" alt="sol"></span>
    </div>
    <div class="auth-card">
      <h2>Iniciar sesión</h2>
      <div class="field"><label>usuario</label><input id="loginUser" placeholder="Tu nombre de usuario"></div>
      <div class="field"><label>contraseña</label><input id="loginPass" type="password" placeholder="Tu contraseña"></div>
      <button class="btn btn-indigo" onclick="handleLogin()">INGRESAR</button>
      <div class="auth-links">
        <a onclick="go('forgotPhone')">¿olvidó su contraseña?</a>
        <a onclick="go('register')">¿no tiene cuenta?</a>
      </div>
    </div>
  </div>`;
}

// VALIDAR EL LOGIN
// Lee el usuario y la contraseña, y los compara.
function handleLogin(){
  const userVal = (document.getElementById('loginUser').value || '').trim().toLowerCase().replace(/\s+/g,'');
  const passVal = (document.getElementById('loginPass').value || '').trim();
  const account = CREDENTIALS[userVal];

  if(!account || account.password !== passVal){
    showToast('Usuario o contraseña incorrectos');
    return;
  }

  showToast('Ingresando');
  setTimeout(()=>{
    state.role = account.role;
    state.adminSession = account.role === 'admin';
    state.homeTab = 'home';
    go('app');
  }, 300);
}

// PANTALLA DE REGISTRO
// Formulario para crear una cuenta nueva. Al final pide el código de verificación.
function screenRegister(){
  return `
  ${statusbar(true)}
  <div class="auth-wrap">
    <div class="auth-top"><span class="auth-back" onclick="go('login')">‹</span></div>
    <div style="text-align:center; padding:8px 0 14px;">
      <h1 style="font-family:var(--font-display); font-size:32px; margin:6px 0 14px; color:var(--ink);">REGISTRO</h1>
      <img src="assets/productor.png" alt="productor" style="width:110px; height:110px; object-fit:contain; display:block; margin:0 auto;">
    </div>
    <div class="auth-card" style="border-top-left-radius:36px; border-top-right-radius:36px;">
      <div class="field"><label>Nombre completo</label><input id="regName" placeholder="Nombre y apellido"></div>
      <div class="field"><label>Nombre de usuario</label><input id="regUser" placeholder="Usuario"></div>
      <div class="field"><label>contraseña</label><input id="regPass" type="password" placeholder="Contraseña"></div>
      <div class="field"><label>Telefono</label><input id="regPhone" placeholder="Número de teléfono"></div>
      <button class="btn btn-indigo" onclick="go('registerCode')">ENVIAR CODIGO</button>
    </div>
  </div>`;
}

// RECUPERAR CONTRASEÑA
// Pide el número de teléfono para enviar el código de recuperación.
function screenForgotPhone(){
  return `
  ${statusbar(true)}
  <div class="auth-wrap">
    <div class="auth-top"><span class="auth-back" onclick="go('login')">‹</span></div>
    <div class="auth-hero">
      <h1>¡BIENVENIDO!</h1>
      <span class="hero-img"><img src="assets/registro.png" alt="sol"></span>
    </div>
    <div class="auth-card">
      <h2>Recuperar contraseña</h2>
      <p style="font-size:14px; font-weight:600; text-decoration:underline; color:var(--ink); margin-top:-4px;">Por favor ingrese el número de teléfono que fue asignado a su cuenta</p>
      <div class="field" style="margin-top:14px;"><input placeholder="Telefono" id="fpPhone"></div>
      <button class="btn btn-indigo" onclick="go('forgotCode')">ENVIAR CODIGO</button>
    </div>
  </div>`;
}

// PANTALLA PARA INGRESAR EL CÓDIGO
// Si el código estaba mal, muestra un aviso de error arriba.
function screenCode(kind){
  const wrong = state.codeAttemptWrong;
  const nextScreen = kind === 'register' ? 'app' : 'resetPassword';
  return `
  ${statusbar(true)}
  <div class="auth-wrap" style="background:var(--sky-bright);">
    ${wrong ? `
    <div class="banner error" style="margin:16px 16px 0; background:#e9e6ea;">
      <div style="flex:1;">
        <p class="banner-title">¡CODIGO INCORRECTO!</p>
        <p>Verifique su número de teléfono o reenvíelo</p>
      </div>
      <span style="cursor:pointer; font-weight:700;" onclick="state.codeAttemptWrong=false; render();">Cerrar</span>
    </div>` : `
    <div style="padding:22px 24px 4px;">
      <span class="auth-back" style="color:#fff;" onclick="go('login')">‹</span>
    </div>
    <div style="text-align:center; padding:0 24px 10px;">
      <p style="color:#fff; letter-spacing:1px; margin:0;">YA CASI</p>
      <h1 style="font-family:var(--font-display); color:#fff; font-size:26px; margin:2px 0 12px;">Ultimo paso</h1>
    </div>`}
    <div style="text-align:center; margin:${wrong?'26px':'6px'} 0 20px;">
      <span class="hero-img"><img src="assets/solcodigo.png" alt="sol"></span>
    </div>
    <div style="background:var(--cream); flex:1; border-top-left-radius:36px; border-top-right-radius:36px; padding:34px 26px; display:flex; flex-direction:column; align-items:center;">
      <input id="codeInput" placeholder="ingrese el codigo" style="width:100%; text-align:center; border:2px solid var(--ink); border-radius:999px; padding:15px; font-size:15px; background:transparent; margin-bottom:18px;">
      <button class="btn btn-indigo" style="margin-bottom:8px;" onclick="resendCode()">Reenviar</button>
      <p class="timer-note">120 segundos para reenviar codigo</p>
      <button class="btn btn-indigo" style="max-width:200px;" onclick="submitCode('${nextScreen}')">SEGUIR</button>
    </div>
  </div>`;
}

// REENVIAR Y VERIFICAR EL CÓDIGO
function resendCode(){ showToast('Código reenviado'); }
function submitCode(nextScreen){
  const val = document.getElementById('codeInput').value.trim();
  if(val.length < 4){ state.codeAttemptWrong = true; render(); return; }
  state.codeAttemptWrong = false;
  if(nextScreen === 'app'){ state.role='productor'; state.adminSession=false; state.homeTab='home'; }
  go(nextScreen);
}

// PANTALLA PARA CAMBIAR LA CONTRASEÑA
// Muestra el mensaje de éxito y los campos de la nueva contraseña.
function screenResetPassword(){
  return `
  ${statusbar(true)}
  <div class="auth-wrap">
    <div class="banner success" style="margin:16px 16px 0; background:#e6e6e6;">
      <div>
        <p class="banner-title">POR FAVOR INICIE SESION</p>
        <p>Contraseña establecida correctamente.</p>
      </div>
    </div>
    <div style="text-align:center; margin:18px 0 8px;"><span class="hero-img"><img src="assets/registro.png" alt="sol"></span></div>
    <div class="auth-card">
      <h2>Recuperar contraseña</h2>
      <div class="field"><input type="password" placeholder="Nueva contraseña"></div>
      <div class="field"><input type="password" placeholder="Confirmar contraseña"></div>
      <button class="btn btn-indigo" onclick="go('login')">REESTABLECER</button>
    </div>
  </div>`;
}

// ESTRUCTURA DE LA APP
function screenApp(){
  return wrapApp(screenForTab(), true);
}

function wrapApp(innerHtml, showNav){
  return `
  ${innerHtml}
  ${showNav ? bottomNav() : ''}
  `;
}

// ELEGIR QUÉ PANTALLA MOSTRAR SEGÚN LA PESTAÑA
function screenForTab(){
  switch(state.homeTab){
    case 'home': return screenHomeByRole();
    case 'historial': return screenHistorial();
    case 'crear': return screenCrearAlerta();
    case 'registroAdmin': return screenRegistroProductor();
    case 'registrarUsuario': return screenRegistrarUsuario();
    case 'perfil': return screenPerfil();
    default: return screenHomeByRole();
  }
}

// VOLVER AL INICIO
// Si es administrador, recupera su rol para que vea otra vez el selector de roles.
function goHome(){
  if(state.adminSession) state.role = 'admin';
  state.homeTab = 'home';
  render();
}

// MENÚ DE ABAJO
// Cambia los botones según el rol: gerencia, admin o productor.
function bottomNav(){
  const t = state.homeTab;

  if(state.role === 'gerencia'){
    return `
    <div class="bottom-nav">
      <button class="${t==='home'?'active':''}" onclick="goHome()">Inicio</button>
      <button class="${t==='historial'?'active':''}" onclick="setTab('historial')">Historial</button>
      <button class="${t==='registroAdmin'?'active':''}" onclick="setTab('registroAdmin')">Registro</button>
      <button class="${t==='perfil'?'active':''}" onclick="setTab('perfil')">Perfil</button>
    </div>`;
  }
  if(state.role === 'admin'){
    return `
    <div class="bottom-nav">
      <button class="${t==='home'?'active':''}" onclick="goHome()">Inicio</button>
      <button class="${t==='historial'?'active':''}" onclick="setTab('historial')">Historial</button>
      <button class="${t==='registrarUsuario'?'active':''}" onclick="setTab('registrarUsuario')">Registro</button>
      <button class="${t==='perfil'?'active':''}" onclick="setTab('perfil')">Perfil</button>
    </div>`;
  }
  return `
  <div class="bottom-nav">
    <button class="${t==='home'?'active':''}" onclick="goHome()">Inicio</button>
    <button class="${t==='historial'?'active':''}" onclick="setTab('historial')">Historial</button>
    <button class="${t==='perfil'?'active':''}" onclick="setTab('perfil')">Perfil</button>
  </div>`;
}

// PANTALLA DE SELECCIÓN DE ROL (solo para el administrador)
// Muestra el mapa y tres botones para entrar como agrónomo, gerencia o productor.
function screenRoleSelect(){
  return `
  ${statusbar(true)}
  <div style="display:flex; align-items:center; gap:10px; padding:12px 16px 0;">
    <div class="search-box" style="flex:1;"><span>buscar</span></div>
    <div style="width:38px;height:38px;border-radius:50%;background:var(--sky-deep); flex-shrink:0;"></div>
  </div>
  <div class="welcome-title">BIENVENIDO</div>
  <div class="welcome-sub"><img src="assets/logo.png" alt="AgroAlertas" style="width:22px; height:22px; object-fit:contain; vertical-align:-4px; margin-right:4px;"> AGROALERTAS</div>
  <div class="map-block"></div>
  <div class="role-row" style="background:var(--sky-light); flex:1;">
    <button class="role-card" onclick="selectRole('agronomo')">Agronomo</button>
    <button class="role-card" onclick="selectRole('gerencia')">Gerencia</button>
    <button class="role-card" onclick="selectRole('productor')"><span class="role-img"><img src="assets/productor.png" alt="productor"></span>Productor</button>
  </div>
  `;
}

// GUARDAR EL ROL ESCOGIDO
function selectRole(role){
  state.role = role;
  state.homeTab = 'home';
  render();
}

// PANTALLA PRINCIPAL SEGÚN EL ROL
// Cada rol ve una pantalla de inicio diferente.
function screenHomeByRole(){
  if(state.role === 'admin') return screenRoleSelect();
  if(state.role === 'agronomo') return screenCrearAlerta();
  if(state.role === 'gerencia') return screenHomeGerencia();
  return screenHomeAlerta();
}

// PANTALLA DE ALERTAS DEL PRODUCTOR
// Muestra la alerta de lluvia y el calendario.
// Antes de confirmar aparece el botón CONFIRMAR
function screenHomeAlerta(){
  const confirmed = state.alertConfirmed;
  return `
  ${statusbar(true)}
  <div class="search-row">
    <div class="search-box"><span>Buscar en AgroAlertas</span></div>
  </div>
  <div class="app-title-row"><img src="assets/logo.png" alt="AgroAlertas" style="width:24px; height:24px; object-fit:contain;"><h2>AGROALERTAS</h2></div>
  ${confirmed ? `
  <div class="alert-hero">
    <span class="alert-img"><img src="assets/lluvia.png" alt="lluvia"></span>
    <h2>ALERTA lluvia</h2>
    <p>Lluvia fuerte pronosticada en Tierralta. En las próximas 3 horas se esperan lluvias intensas. <u style="cursor:pointer;" onclick="showToast('Más detalles')">Mas detalles</u></p>
    <div class="alert-actions">
      <span class="pill-btn green">ALERTA CONFIRMADA</span>
      <span class="pill-btn dark">SMS</span>
    </div>
  </div>` : `
  <div class="alert-hero">
    <span class="alert-img alert-img-lg"><img src="assets/lluvia.png" alt="lluvia"></span>
    <h2>ALERTA<br>LLUVIA</h2>
    <p>Lluvia fuerte pronosticada en Tierralta. En las próximas 3 horas se esperan lluvias intensas</p>
    <div class="risk-pill">RIESGO ALTO</div>
    <div class="alert-actions">
      <button class="pill-btn" onclick="confirmAlert()">CONFIRMAR</button>
      <button class="pill-btn dark" onclick="showToast('Más detalles')">mas detalles</button>
    </div>
    <span class="sms-tag">SMS</span>
  </div>`}
  <div class="calendar">
    <div class="cal-head">
      <span class="cal-year">2026</span>
      <span class="cal-month">JUNIO</span>
    </div>
    ${buildCalendar()}
  </div>
  `;
}

// CONFIRMAR LA ALERTA
// Marca la alerta como confirmada y avisa que se envió el SMS.
function confirmAlert(){
  state.alertConfirmed = true;
  showToast('Alerta confirmada y SMS enviado');
  render();
}

// CALENDARIO
function buildCalendar(){
  const dows = ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
  let head = dows.map(d=>`<div class="dow">${d}</div>`).join('');
  const leading = 1;
  const daysInMonth = 30;
  let cells = '';
  for(let i=0;i<leading;i++) cells += `<div class="day empty"></div>`;
  for(let d=1; d<=daysInMonth; d++){
    cells += `<div class="day ${d===17?'today':''}">${d}</div>`;
  }
  return `<div class="cal-grid">${head}${cells}</div>`;
}

// PANTALLA DE INICIO DE GERENCIA
// Muestra el mapa y el banner del productor asociado.
function screenHomeGerencia(){
  return `
  ${statusbar(true)}
  <div style="display:flex; align-items:center; gap:10px; padding:12px 16px 0;">
    <div class="search-box" style="flex:1;"><span>buscar</span></div>
    <div style="width:38px;height:38px;border-radius:50%;background:var(--sky-deep); flex-shrink:0;"></div>
  </div>
  <div class="welcome-title">BIENVENIDO</div>
  <div class="welcome-sub"><img src="assets/logo.png" alt="AgroAlertas" style="width:22px; height:22px; object-fit:contain; vertical-align:-4px; margin-right:4px;"> AGROALERTAS</div>
  <div class="map-block"></div>
  <div style="background:var(--sky-light); flex:1;">
    <div class="producer-banner">
      <span class="role-img"><img src="assets/productor.png" alt="productor"></span>
      <strong>Productor<br>Asociado</strong>
    </div>
  </div>
  `;
}

// PANTALLA PARA REGISTRAR USUARIOS (administrador)
// Formulario
function screenRegistrarUsuario(){
  return `
  <div class="header-blue" style="text-align:center; background:#8BCAEB; color:var(--ink); position:relative;">
    <div class="icon-btn" style="position:absolute; left:14px; top:14px; background:rgba(0,0,0,.1);" onclick="goHome()">‹</div>
    <h1 style="font-size:20px; display:flex; align-items:center; justify-content:center; gap:8px;"><img src="assets/logo.png" alt="AgroAlertas" style="width:24px; height:24px; object-fit:contain;"> AGROALERTAS</h1>
  </div>
  <div class="map-block map-block-river" style="height:150px;"></div>
  <div class="form-wrap" style="background:var(--sky-light); flex:1; padding-top:32px;">
    <div class="field" style="margin-bottom:22px;"><label>usuario</label><input placeholder="Usuario" style="padding:16px;"></div>
    <div class="field" style="margin-bottom:22px;"><label>contraseña</label><input type="password" placeholder="Contraseña" style="padding:16px;"></div>
    <div class="field" style="margin-bottom:22px;"><label>lote</label><input placeholder="Lote" style="padding:16px;"></div>
    <button class="btn btn-indigo" onclick="showToast('Usuario registrado')">registrar</button>
  </div>
  `;
}

// HISTORIAL
// Muestra el buscador, los filtros de fecha y una tarjeta por cada alerta
function screenHistorial(){
  return `
  <div class="header-blue">
    <div class="top-row">
      <div class="icon-btn" onclick="goHome()">‹</div>
      <h1 style="text-align:left;">${roleLabel()}</h1>
    </div>
    <h1 style="margin-top:6px; font-size:22px;">Historial</h1>
  </div>
  <div class="hist-search"><input placeholder="Buscar por fecha"></div>
  <div class="hist-filters">
    <select><option>Dia</option></select>
    <select><option>Mes</option></select>
    <select><option>Año</option></select>
  </div>
  <div class="hist-list">
    ${state.history.map(h=>`
      <div class="hist-card">
        <div class="hist-thumb"></div>
        <div>
          <h3>${h.title}</h3>
          <p>${h.risk}</p>
          <button class="detail-btn" onclick="showToast('${h.title}: detalles')">DETALLES</button>
        </div>
        <span class="hist-date">${h.date}</span>
      </div>
    `).join('')}
  </div>
  <div class="dots-row"><span class="active"></span><span></span><span></span></div>
  `;
}

// NOMBRE DEL ROL
// Devuelve el nombre del rol actual para ponerlo en los títulos.
function roleLabel(){
  if(state.role === 'admin') return 'Administrador';
  if(state.role === 'agronomo') return 'Agronomo';
  if(state.role === 'gerencia') return 'Gerencia';
  return 'Productor';
}

// PANTALLA PARA CREAR ALERTA (agrónomo)
// Formulario con título, evento, riesgo, ubicación y recomendación.
function screenCrearAlerta(){
  return `
  <div class="header-blue">
    <div class="top-row">
      <div class="icon-btn" onclick="goHome()">‹</div>
      <h1>Agronomo</h1>
    </div>
  </div>
  <div style="background:var(--sky-header); text-align:center; padding:10px 0 12px;">
    <h2 style="color:#ffce54; font-family:var(--font-display); margin:0; letter-spacing:1px;">CREAR ALERTA</h2>
  </div>
  <div class="form-wrap">
    <div class="field"><label>Titulo de la alerta</label><input placeholder="Ej. Lluvia intensa"></div>
    <div class="form-row2">
      <div class="field">
        <label>Evento</label>
        <select><option>LLUVIA</option><option>VIENTO</option><option>TEMPERATURA</option><option>SEQUIA</option></select>
      </div>
      <div class="field">
        <label>Riesgo</label>
        <select><option>Bajo</option><option>Medio</option><option>Alto</option></select>
      </div>
    </div>
    <div class="field"><label>Ubicacion</label><input placeholder="Vereda / lote"></div>
    <div class="field"><label>Recomendacion</label><textarea placeholder="Escriba una recomendación para el productor"></textarea></div>
    <div class="form-actions">
      <button class="btn-small navy" onclick="showToast('Modo edición')">Editar</button>
      <button class="btn-small navy" onclick="showToast('Alerta guardada')">Guardar</button>
    </div>
  </div>
  <div class="dots-row"><span class="active"></span><span></span><span></span></div>
  `;
}

// PANTALLA DE REGISTRO DE PRODUCTOR (gerencia)
// Formulario con tipo, edad en meses, área y productor asociado.
function screenRegistroProductor(){
  return `
  <div class="header-blue">
    <div class="top-row">
      <div class="icon-btn" onclick="goHome()">‹</div>
      <h1>Gerencia</h1>
    </div>
  </div>
  <div style="background:var(--sky-header); text-align:center; padding:10px 0 12px;">
    <h2 style="color:#fff; font-family:var(--font-display); margin:0;">Registro</h2>
  </div>
  <div class="form-wrap">
    <div class="field"><label>TIPO</label><input placeholder="Tipo de cultivo / registro"></div>
    <div class="field">
      <label>EDAD POR MES</label>
      <select>${Array.from({length:12},(_,i)=>`<option ${i===0?'selected':''}>${i+1}</option>`).join('')}</select>
    </div>
    <div class="field"><label>AREA</label><textarea placeholder="Área del lote (hectáreas)"></textarea></div>
    <div class="field">
      <label>PRODUCTOR ASOCIADO</label>
      <select><option>Eduardo Perez Martinez</option><option>Argenis Mercado</option></select>
    </div>
    <div class="form-actions">
      <button class="btn-small navy" onclick="showToast('Modo edición')">Editar</button>
      <button class="btn-small navy" onclick="showToast('Registro guardado')">Guardar</button>
    </div>
  </div>
  <div class="dots-row"><span class="active"></span><span></span><span></span></div>
  `;
}

// PANTALLA DE PERFIL
// Muestra pqrincipalemte el nombre, el teléfono y la lista de opciones.
function screenPerfil(){
  const isProductor = state.role === 'productor';
  const name = isProductor ? 'Productor asociado' : 'Argenis Yadir Mercado Triana';
  const sub = isProductor ? 'numero de telefono' : '3234662288';
  return `
  <div class="profile-header">
    <div class="top-row">
      <div class="icon-btn" onclick="goHome()">‹</div>
      <h1>Perfil</h1>
    </div>
    <div class="avatar-wrap">
      <div class="avatar"></div>
    </div>
    <h2>${name}</h2>
    <div class="phone">${sub}</div>
  </div>
  <div class="section-label">General</div>
  <div class="settings-list">
    <div class="settings-row">
      <div class="txt"><strong>Modo</strong><span>Dark &amp; Light</span></div>
      <div class="toggle"></div>
    </div>
    <div class="settings-row" onclick="showToast('Cambiar contraseña')">
      <div class="txt"><strong>Contraseña</strong></div>
      <span class="chev">›</span>
    </div>
    <div class="settings-row" onclick="showToast('Lenguaje')">
      <div class="txt"><strong>Lenguaje</strong></div>
      <span class="chev">›</span>
    </div>
    <div class="section-label">Informacion</div>
    <div class="settings-row" onclick="showToast('Datos personales')">
      <div class="txt"><strong>Personal</strong></div>
      <span class="chev">›</span>
    </div>
    ${isProductor ? `
    <div class="settings-row" onclick="showToast('Ubicación')">
      <div class="txt"><strong>ubicacion</strong></div>
      <span class="chev">›</span>
    </div>
    <div class="settings-row" onclick="showToast('Cultivo')">
      <div class="txt"><strong>Cultivo</strong></div>
      <span class="chev">›</span>
    </div>` : `
    <div class="settings-row" onclick="showToast('Solicitar info')">
      <div class="txt"><strong>Solicitar info</strong></div>
      <span class="chev">›</span>
    </div>
    <div class="settings-row" onclick="showToast('Ayuda')">
      <div class="txt"><strong>Ayuda</strong></div>
      <span class="chev">›</span>
    </div>`}
    <div class="settings-row" onclick="showToast('Manual')">
      <div class="txt"><strong>Manual</strong></div>
      <span class="chev">›</span>
    </div>
  </div>
  `;
}

// DIBUJAR LA PANTALLA
function render(){
  const view = document.getElementById('view');
  let html = '';
  switch(state.screen){
    case 'splash': html = screenSplash(); break;
    case 'login': html = screenLogin(); break;
    case 'register': html = screenRegister(); break;
    case 'registerCode': html = screenCode('register'); break;
    case 'forgotPhone': html = screenForgotPhone(); break;
    case 'forgotCode': html = screenCode('forgot'); break;
    case 'resetPassword': html = screenResetPassword(); break;
    case 'app': html = screenApp(); break;
    default: html = screenSplash();
  }
  view.innerHTML = `<div class="fade-in" style="display:flex; flex-direction:column; min-height:100%;">${html}</div>`;
}

render();