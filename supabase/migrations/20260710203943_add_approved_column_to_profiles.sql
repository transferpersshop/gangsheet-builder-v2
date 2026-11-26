-- Add approved column: existing users get approved=true, new self-registered users will default to false
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;

-- Set all existing users to approved (they were already active before this feature)
UPDATE public.profiles SET approved = true WHERE approved = false;

-- Update the handle_new_user trigger to set approved=false for self-registered users
-- Admin-created users will be set to approved=true via the admin API
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, company_name, role, blocked, approved)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'display_name', ''),
    COALESCE(new.raw_user_meta_data->>'company_name', ''),
    'user',
    false,
    false
  );
  RETURN new;
END;
$$;
