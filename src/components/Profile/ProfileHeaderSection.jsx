import UseHeader from './UseHeader'

export default function ProfileHeaderSection({
  user,
  isMobile,
  editing,
  onEdit,
  onDelete
}) {
  return (
    <UseHeader
      user={user}
      isMobile={isMobile}
      editing={editing}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}
