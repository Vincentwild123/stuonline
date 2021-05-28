export function showToast(title) {
  uni.showToast({
    title: title,
    icon: "none",
    duration: 1500,
  });
}
export function showLoading(title) {
  uni.showLoading({
    title: title,
  });
}
export function hideLoading() {
  uni.hideLoading();
}
