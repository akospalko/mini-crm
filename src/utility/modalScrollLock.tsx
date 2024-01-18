// Apply scroll lock on modal container
export const modalScrollLock = (isModalOpen: boolean) => {
  // Toggle modal
  if (isModalOpen) {
    document.body.style.position = "static";
    document.body.style.removeProperty("width");
  } else {
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  }
};