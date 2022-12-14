import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
  const isPending = ref(false)

  const error = ref(null)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true
    try {
      const res = await projectFirestore.collection(collection).add(doc)
      isPending.value = false
      return res

    }
    catch (err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not send the message'
    }
  }

  return { error, addDoc, isPending }

}

export default useCollection