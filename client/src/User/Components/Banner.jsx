import React from 'react'

const Banner = (props) => {
  return (
    <div class="breadcrumb-area breadcrumb-mt bg-gray breadcrumb-ptb-1">
    <div class="container">
        <div class="breadcrumb-content text-center">
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
        </div>
    </div>
    <div class="breadcrumb-img-1">
        <img src="assets/images/about/breadcrumb-1.jpg" alt=""/>
    </div>
    <div class="breadcrumb-img-2">
        <img src="assets/images/about/breadcrumb-4.png" alt=""/>
    </div>
</div>
  )
}

export default Banner