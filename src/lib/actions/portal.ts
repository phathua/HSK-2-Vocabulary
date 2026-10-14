/**
 * Action Svelte đưa phần tử DOM trực tiếp ra document.body.
 * Giải quyết triệt để lỗi modal bị giam hãm bên trong các thẻ cha có backdrop-filter hoặc overflow-hidden.
 */
export function portal(node: HTMLElement) {
  if (typeof document !== 'undefined' && document.body) {
    document.body.appendChild(node);
  }

  return {
    destroy() {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }
  };
}
