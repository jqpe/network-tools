export const IANA_DB = 'https://www.iana.org/domains/root/db/'
export const TLD_LIST_URI =
  import.meta.env.TLD_LIST_URI ??
  'https://data.iana.org/TLD/tlds-alpha-by-domain.txt'

// match all
export const INITIAL_TLD_FILTER = /.+/g
