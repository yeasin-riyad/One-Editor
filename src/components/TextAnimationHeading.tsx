'use client'
import { cn } from '@/lib/utils'
import { TypeAnimation } from 'react-type-animation'


type TextAnimationHeaderProps={
    className?:string
}
const TextAnimationHeading = ({className}:TextAnimationHeaderProps) => {

  return (
    <div className={cn("flex flex-col items-center my-2 gap-2  font-bold text-2xl lg:text-5xl",className)}>
        <div className="text-primary drop-shadow-md">Build Space</div>
        <div>

        <TypeAnimation
      sequence={[ 
        'Your Team',
        1000,
        'Your Ideas',
        1000,
        'One Editor',
        1000
      ]}
      wrapper="span"
      speed={50}
    //   style={{ fontSize: '.75em', display: 'inline-block' }}
      repeat={Infinity}
    />
        </div>
      </div>
  )
}

export default TextAnimationHeading
