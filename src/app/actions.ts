'use server';

import { createClient } from '@/lib/supabase/server';

export async function subscribeToNewsletter(email: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('subscribers')
    .upsert({ email, source: 'newsletter' }, { onConflict: 'email' });

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}
