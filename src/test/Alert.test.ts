/* eslint-disable import/no-extraneous-dependencies */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alert from '../components/Alert.vue'
import { AlertItem } from '../types/exercise'

describe('Alert.vue', () => {
  const alertItem: AlertItem = {
    message: 'Fetched Data',
    title: 'Success',
    type: 'success',
    showAlert: true,
  }
  const wrapper = mount(Alert, {
    propsData: {
      item: alertItem,
    },
  })
  it('checks the prop vaule', () => {
    expect(wrapper.props().item).toEqual(alertItem)
  })

  it('checks data emitted after button clicked', () => {
    wrapper.vm.hideAlert()
    const data = { message: '', title: '', type: '', showAlert: false }
    expect(wrapper.emitted().alertData[0]).toEqual([data])
  })
})
