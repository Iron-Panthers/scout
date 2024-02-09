import React from "react"

import PropTypes from "prop-types"

import "./buttons.scss"

const ImageLocation = ({ label, imgDimensions, offset, relativeImgPos, dispatchButtonLocation}) => {

  const height = imgDimensions.height / 7;
  const width = height;

  // T-T I just don't want to deal with css rn
  const styles = {
    // Subtracting the height and width, so that the centerpoint is at the specified coords
    left: offset.x + relativeImgPos.x * imgDimensions.width - width / 2,
    top: offset.y + relativeImgPos.y * imgDimensions.height - height / 2,
    // Might need to fix these two to find if width would ever be limited first (i.e.) half field or smth
    minHeight: height,
    minWidth: width,
  }

  return (
    <button
      className={`transparent imageLocation`}
      style = {styles}
      onClick={() => {
        dispatchButtonLocation(label)
      }}
    >{`${label}`}</button>
  )
}

ImageLocation.propTypes = {
  label: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  phase: PropTypes.bool,
  imgHeight: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default ImageLocation
