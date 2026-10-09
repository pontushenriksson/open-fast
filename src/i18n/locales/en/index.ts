import type { Locale } from '../../types'
import { foods } from './foods'
import { guide } from './guide'
import { phases } from './phases'
import { plans } from './plans'
import { research } from './research'
import { ui } from './ui'

export const en: Locale = { lang: 'en', intl: 'en-GB', ui, plans, phases, foods, research, guide }
