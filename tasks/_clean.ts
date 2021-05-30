import { src } from 'gulp';
import _clean from 'gulp-clean';
import { _baseDist } from './_paths'

export default function clean () {
  return src(_baseDist, {allowEmpty: true}).pipe(_clean())
}