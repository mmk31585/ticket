import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PageHeader from '@/components/common/PageHeader.vue'

const factory = (props?: Record<string, unknown>) =>
  mount(PageHeader, {
    props: {
      title: 'عنوان تستی',
      description: 'توضیح نمونه',
      breadcrumb: [
        { label: 'خانه', to: '/' },
        { label: 'مدیریت' },
      ],
      ...props,
    },
    global: {
      stubs: {
        'router-link': {
          template: '<a><slot /></a>',
        },
      },
    },
  })

describe('PageHeader', () => {
  it('عنوان و توضیح را نمایش می‌دهد', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('عنوان تستی')
    expect(wrapper.text()).toContain('توضیح نمونه')
  })

  it('مسیر ناوبری را بر اساس ورودی رندر می‌کند', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('خانه')
    expect(wrapper.text()).toContain('مدیریت')
  })
})
