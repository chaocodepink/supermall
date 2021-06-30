import * as types from './mutation-types'

const actions = {
  addCart(content, payload) {
    return new Promise((res, rej) => {
      let oldProduct = content.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {

        content.commit(types.INCREMENT_COUNT, oldProduct)
        res('当前的商品数量+1')
      } else {

        content.commit(types.ADD_TO_CART, payload)
        res('添加了新商品')
      }

    })

  }
}

export default actions
