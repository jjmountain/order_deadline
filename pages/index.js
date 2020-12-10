import { Page, Layout, EmptyState  } from "@shopify/polaris";
import { ResourcePicker } from '@shopify/app-bridge-react'
import React, { useState } from 'react';
import store from 'store-js';
import ProductList from '../components/ProductList';

function Index() {
  const [modal, setModal] = useState({ open: false })
  const emptyState = !store.get('ids');

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id)
    setModal({open: false})
    store.set('ids', idsFromResources)
    console.log('products ids here', store.get('ids'));
  }

    return (
      <Page
        title='Product Selector'
        primaryAction={{
          content: 'Select products',
          onAction: () => setModal({open: true})
        }}
      >
        <ResourcePicker 
          resourceType='Product'
          open={modal.open}
          onCancel={() => setModal({open: false})}
          onSelection={(resources) => handleSelection(resources)}
        />
          { emptyState ? 
        <Layout>
          <EmptyState
            heading="Manage your inventory transfers"
            action={{
              content: 'Select Products',
              onAction: () => setModal({ open: true })
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg" 
          >
            <p>Select Products</p>
          </EmptyState>
        </Layout>
          :
          <ProductList />
          }

      </Page>
    )
}


export default Index;
