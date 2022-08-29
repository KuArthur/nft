import { ParseProvider } from '../../Modules/parse.provider';

export async function LaunchSetCollections (job) {
  const { slug, original_collection_id } = job.data;

  console.log('job ', job.id, ' --- ', slug);

  const module = new ParseProvider;

  await module.setCollection({
    slug, original_collection_id
  })
}
