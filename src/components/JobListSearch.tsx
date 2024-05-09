import { useJobItemsContext } from '../lib/hooks'
import JobList from './JobList'

function JobListSearch() {
    const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
}

export default JobListSearch