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
export function setStorage(key, data) {
  try {
    uni.setStorageSync(key, data);
  } catch (e) {
    console.error(e);
  }
}
export function getStorage(key) {
  try {
    const data = uni.getStorageSync(key);
    return data;
  } catch (e) {
    console.log(e);
  }
}
export function navigateTo(url, params) {
  uni.navigateTo({
    url,
    ...params,
  });
}
