const CONTAINER_ID = 'salty-cube-container'

export const createContainer = () => {
  let container = document.getElementById(CONTAINER_ID)
  if (container == null) {
    container = document.createElement('div')
    container.id = CONTAINER_ID

    document.body.append(container)
  }

  return container
}
