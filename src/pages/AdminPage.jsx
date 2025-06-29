import { useState } from 'react'
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast
} from '@chakra-ui/react'
import SeriesAdminForm from '../components/Admin/SeriesAdminForm'
import SeriesAdminList from '../components/Admin/SeriesAdminList'
import AdminReviewsList from '../components/Admin/AdminReviewsList'
import AdminUsersList from '../components/Admin/AdminUsersList'

export default function AdminPage() {
  const [editSerie, setEditSerie] = useState(null)
  const [refreshSeries, setRefreshSeries] = useState(0)
  const [refreshReviews, setRefreshReviews] = useState(0)
  const [refreshUsers, setRefreshUsers] = useState(0)
  const toast = useToast()

  const handleSerieSaved = () => {
    setEditSerie(null)
    setRefreshSeries((x) => x + 1)
  }

  return (
    <Box maxW='1200px' mx='auto' mt={8} p={6}>
      <Heading color='brand.200' mb={6}>
        Panel de Administración
      </Heading>
      <Tabs isFitted variant='enclosed'>
        <TabList mb={4}>
          <Tab>Series</Tab>
          <Tab>Reseñas</Tab>
          <Tab>Usuarios</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SeriesAdminForm
              key={editSerie?._id || 'new'}
              serie={editSerie}
              onSuccess={handleSerieSaved}
            />
            <SeriesAdminList
              key={refreshSeries}
              onEdit={setEditSerie}
              onSeriesChange={() => setRefreshSeries((x) => x + 1)}
            />
          </TabPanel>
          <TabPanel>
            <AdminReviewsList
              key={refreshReviews}
              onReviewsChange={() => setRefreshReviews((x) => x + 1)}
            />
          </TabPanel>
          <TabPanel>
            <AdminUsersList
              key={refreshUsers}
              onUsersChange={() => setRefreshUsers((x) => x + 1)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
