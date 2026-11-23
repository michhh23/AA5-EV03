// MENSAJE
function Toast({ msg, visible }) {
  return (
    <div id="toast" className={visible ? 'toast-app show' : 'toast-app'}>
      {msg}
    </div>
  );
}

export default Toast;