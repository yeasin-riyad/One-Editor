import Image from 'next/image'
import Link from 'next/link'

const Logo = ({w,h}:{w?:number, h?:number}) => {
  return (
    <Link href={"/"}>
    <Image alt="Logo" width={w??120} height={h??50} src={"/logo.png"}/>
    </Link>
  )
}

export default Logo
