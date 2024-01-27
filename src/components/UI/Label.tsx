// Input field's reusable label
interface LabelPropsI {
  content: string
  elemTitle: string
}

const Label = ({ content, elemTitle }: LabelPropsI) => {
  // STYLE
  const inputLabelStyle: string =
    "flex items-center w-full h-[35px] text-lg text-color_3 capitalize truncate"

  return (
    <label title={elemTitle} className={inputLabelStyle}>
      <span className="my-auto truncate">{content}</span>
    </label>
  )
}

export default Label
