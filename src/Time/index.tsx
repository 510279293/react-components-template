import { useEffect, useState } from "react"
import dayjs from "dayjs"
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn') // 使用本地化语言

type TimeProps = {
  time: number | Date | string;
  interval?: number | boolean;
}

const useRelativeTimeHook = (time: TimeProps['time'], interval?: TimeProps['interval']) => {
  const [val, setVal] = useState((dayjs(time) as any).fromNow())
  const loop = () => setInterval(() => setVal((dayjs(time) as any).fromNow()), (typeof interval === 'number' && interval) ? interval * 1000 : 60 * 1000)

  useEffect(() => {
    if (interval !== false) {
      const timer = loop()
      return () => clearInterval(timer)
    }
  }, [])

  return {
    val,
    setVal
  }
}

const Time = ({time, interval}: TimeProps) => {
  const { val } = useRelativeTimeHook(time, interval)
  return val
}

Time.useRelativeTime = useRelativeTimeHook

export default Time
