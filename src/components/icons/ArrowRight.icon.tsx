const ArrowRightIcon = ({
  color = 'rgb(var(--rgb-fg1))',
  size = 24
}: {
  color?: string
  size?: number
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.7501 11.7258L4.75012 11.7258"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.6998 5.70124C13.6998 5.70124 19.7498 8.96224 19.7498 11.7242C19.7498 14.4882 13.6998 17.7502 13.6998 17.7502"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowRightIcon
