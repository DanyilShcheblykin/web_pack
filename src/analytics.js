import * as $ from 'jquery'
function createAnalytics() {
    let counter = 0

    let destr = false

    const listener = () => ++counter

    $(document).on("click", listener)
    return {
        destroy() {
            $(document).off('click', listener)
            destr = true
        },
        getClicks() {
            if (destr) {
              return 'analytics is destroyed';
            }
            return counter;
          }
    }
}
window.analytics = createAnalytics()