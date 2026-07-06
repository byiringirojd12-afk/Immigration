const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const countries = [
  { name: 'Afghanistan', alpha2: 'AF', alpha3: 'AFG', nationality: 'Afghan', flagEmoji: '🇦🇫', phoneCode: '+93', currency: 'AFN', timezone: 'Asia/Kabul' },
  { name: 'Albania', alpha2: 'AL', alpha3: 'ALB', nationality: 'Albanian', flagEmoji: '🇦🇱', phoneCode: '+355', currency: 'ALL', timezone: 'Europe/Tirane' },
  { name: 'Algeria', alpha2: 'DZ', alpha3: 'DZA', nationality: 'Algerian', flagEmoji: '🇩🇿', phoneCode: '+213', currency: 'DZD', timezone: 'Africa/Algiers' },
  { name: 'Andorra', alpha2: 'AD', alpha3: 'AND', nationality: 'Andorran', flagEmoji: '🇦🇩', phoneCode: '+376', currency: 'EUR', timezone: 'Europe/Andorra' },
  { name: 'Angola', alpha2: 'AO', alpha3: 'AGO', nationality: 'Angolan', flagEmoji: '🇦🇴', phoneCode: '+244', currency: 'AOA', timezone: 'Africa/Luanda' },
  { name: 'Antigua and Barbuda', alpha2: 'AG', alpha3: 'ATG', nationality: 'Antiguan', flagEmoji: '🇦🇬', phoneCode: '+1-268', currency: 'XCD', timezone: 'America/Antigua' },
  { name: 'Argentina', alpha2: 'AR', alpha3: 'ARG', nationality: 'Argentine', flagEmoji: '🇦🇷', phoneCode: '+54', currency: 'ARS', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Armenia', alpha2: 'AM', alpha3: 'ARM', nationality: 'Armenian', flagEmoji: '🇦🇲', phoneCode: '+374', currency: 'AMD', timezone: 'Asia/Yerevan' },
  { name: 'Australia', alpha2: 'AU', alpha3: 'AUS', nationality: 'Australian', flagEmoji: '🇦🇺', phoneCode: '+61', currency: 'AUD', timezone: 'Australia/Sydney' },
  { name: 'Austria', alpha2: 'AT', alpha3: 'AUT', nationality: 'Austrian', flagEmoji: '🇦🇹', phoneCode: '+43', currency: 'EUR', timezone: 'Europe/Vienna' },
  { name: 'Azerbaijan', alpha2: 'AZ', alpha3: 'AZE', nationality: 'Azerbaijani', flagEmoji: '🇦🇿', phoneCode: '+994', currency: 'AZN', timezone: 'Asia/Baku' },
  { name: 'Bahamas', alpha2: 'BS', alpha3: 'BHS', nationality: 'Bahamian', flagEmoji: '🇧🇸', phoneCode: '+1-242', currency: 'BSD', timezone: 'America/Nassau' },
  { name: 'Bahrain', alpha2: 'BH', alpha3: 'BHR', nationality: 'Bahraini', flagEmoji: '🇧🇭', phoneCode: '+973', currency: 'BHD', timezone: 'Asia/Bahrain' },
  { name: 'Bangladesh', alpha2: 'BD', alpha3: 'BGD', nationality: 'Bangladeshi', flagEmoji: '🇧🇩', phoneCode: '+880', currency: 'BDT', timezone: 'Asia/Dhaka' },
  { name: 'Barbados', alpha2: 'BB', alpha3: 'BRB', nationality: 'Barbadian', flagEmoji: '🇧🇧', phoneCode: '+1-246', currency: 'BBD', timezone: 'America/Barbados' },
  { name: 'Belarus', alpha2: 'BY', alpha3: 'BLR', nationality: 'Belarusian', flagEmoji: '🇧🇾', phoneCode: '+375', currency: 'BYN', timezone: 'Europe/Minsk' },
  { name: 'Belgium', alpha2: 'BE', alpha3: 'BEL', nationality: 'Belgian', flagEmoji: '🇧🇪', phoneCode: '+32', currency: 'EUR', timezone: 'Europe/Brussels' },
  { name: 'Belize', alpha2: 'BZ', alpha3: 'BLZ', nationality: 'Belizean', flagEmoji: '🇧🇿', phoneCode: '+501', currency: 'BZD', timezone: 'America/Belize' },
  { name: 'Benin', alpha2: 'BJ', alpha3: 'BEN', nationality: 'Beninese', flagEmoji: '🇧🇯', phoneCode: '+229', currency: 'XOF', timezone: 'Africa/Porto-Novo' },
  { name: 'Bhutan', alpha2: 'BT', alpha3: 'BTN', nationality: 'Bhutanese', flagEmoji: '🇧🇹', phoneCode: '+975', currency: 'BTN', timezone: 'Asia/Thimphu' },
  { name: 'Bolivia', alpha2: 'BO', alpha3: 'BOL', nationality: 'Bolivian', flagEmoji: '🇧🇴', phoneCode: '+591', currency: 'BOB', timezone: 'America/La_Paz' },
  { name: 'Bosnia and Herzegovina', alpha2: 'BA', alpha3: 'BIH', nationality: 'Bosnian', flagEmoji: '🇧🇦', phoneCode: '+387', currency: 'BAM', timezone: 'Europe/Sarajevo' },
  { name: 'Botswana', alpha2: 'BW', alpha3: 'BWA', nationality: 'Motswana', flagEmoji: '🇧🇼', phoneCode: '+267', currency: 'BWP', timezone: 'Africa/Gaborone' },
  { name: 'Brazil', alpha2: 'BR', alpha3: 'BRA', nationality: 'Brazilian', flagEmoji: '🇧🇷', phoneCode: '+55', currency: 'BRL', timezone: 'America/Sao_Paulo' },
  { name: 'Brunei', alpha2: 'BN', alpha3: 'BRN', nationality: 'Bruneian', flagEmoji: '🇧🇳', phoneCode: '+673', currency: 'BND', timezone: 'Asia/Brunei' },
  { name: 'Bulgaria', alpha2: 'BG', alpha3: 'BGR', nationality: 'Bulgarian', flagEmoji: '🇧🇬', phoneCode: '+359', currency: 'BGN', timezone: 'Europe/Sofia' },
  { name: 'Burkina Faso', alpha2: 'BF', alpha3: 'BFA', nationality: 'Burkinabe', flagEmoji: '🇧🇫', phoneCode: '+226', currency: 'XOF', timezone: 'Africa/Ouagadougou' },
  { name: 'Burundi', alpha2: 'BI', alpha3: 'BDI', nationality: 'Burundian', flagEmoji: '🇧🇮', phoneCode: '+257', currency: 'BIF', timezone: 'Africa/Bujumbura' },
  { name: 'Cabo Verde', alpha2: 'CV', alpha3: 'CPV', nationality: 'Cape Verdean', flagEmoji: '🇨🇻', phoneCode: '+238', currency: 'CVE', timezone: 'Atlantic/Cape_Verde' },
  { name: 'Cambodia', alpha2: 'KH', alpha3: 'KHM', nationality: 'Cambodian', flagEmoji: '🇰🇭', phoneCode: '+855', currency: 'KHR', timezone: 'Asia/Phnom_Penh' },
  { name: 'Cameroon', alpha2: 'CM', alpha3: 'CMR', nationality: 'Cameroonian', flagEmoji: '🇨🇲', phoneCode: '+237', currency: 'XAF', timezone: 'Africa/Douala' },
  { name: 'Canada', alpha2: 'CA', alpha3: 'CAN', nationality: 'Canadian', flagEmoji: '🇨🇦', phoneCode: '+1', currency: 'CAD', timezone: 'America/Toronto' },
  { name: 'Central African Republic', alpha2: 'CF', alpha3: 'CAF', nationality: 'Central African', flagEmoji: '🇨🇫', phoneCode: '+236', currency: 'XAF', timezone: 'Africa/Bangui' },
  { name: 'Chad', alpha2: 'TD', alpha3: 'TCD', nationality: 'Chadian', flagEmoji: '🇹🇩', phoneCode: '+235', currency: 'XAF', timezone: 'Africa/Ndjamena' },
  { name: 'Chile', alpha2: 'CL', alpha3: 'CHL', nationality: 'Chilean', flagEmoji: '🇨🇱', phoneCode: '+56', currency: 'CLP', timezone: 'America/Santiago' },
  { name: 'China', alpha2: 'CN', alpha3: 'CHN', nationality: 'Chinese', flagEmoji: '🇨🇳', phoneCode: '+86', currency: 'CNY', timezone: 'Asia/Shanghai' },
  { name: 'Colombia', alpha2: 'CO', alpha3: 'COL', nationality: 'Colombian', flagEmoji: '🇨🇴', phoneCode: '+57', currency: 'COP', timezone: 'America/Bogota' },
  { name: 'Comoros', alpha2: 'KM', alpha3: 'COM', nationality: 'Comorian', flagEmoji: '🇰🇲', phoneCode: '+269', currency: 'KMF', timezone: 'Indian/Comoro' },
  { name: 'Congo (Democratic Republic)', alpha2: 'CD', alpha3: 'COD', nationality: 'Congolese', flagEmoji: '🇨🇩', phoneCode: '+243', currency: 'CDF', timezone: 'Africa/Kinshasa' },
  { name: 'Congo (Republic)', alpha2: 'CG', alpha3: 'COG', nationality: 'Congolese', flagEmoji: '🇨🇬', phoneCode: '+242', currency: 'XAF', timezone: 'Africa/Brazzaville' },
  { name: 'Costa Rica', alpha2: 'CR', alpha3: 'CRI', nationality: 'Costa Rican', flagEmoji: '🇨🇷', phoneCode: '+506', currency: 'CRC', timezone: 'America/Costa_Rica' },
  { name: "Cote d'Ivoire", alpha2: 'CI', alpha3: 'CIV', nationality: 'Ivorian', flagEmoji: '🇨🇮', phoneCode: '+225', currency: 'XOF', timezone: 'Africa/Abidjan' },
  { name: 'Croatia', alpha2: 'HR', alpha3: 'HRV', nationality: 'Croatian', flagEmoji: '🇭🇷', phoneCode: '+385', currency: 'EUR', timezone: 'Europe/Zagreb' },
  { name: 'Cuba', alpha2: 'CU', alpha3: 'CUB', nationality: 'Cuban', flagEmoji: '🇨🇺', phoneCode: '+53', currency: 'CUP', timezone: 'America/Havana' },
  { name: 'Cyprus', alpha2: 'CY', alpha3: 'CYP', nationality: 'Cypriot', flagEmoji: '🇨🇾', phoneCode: '+357', currency: 'EUR', timezone: 'Asia/Nicosia' },
  { name: 'Czech Republic', alpha2: 'CZ', alpha3: 'CZE', nationality: 'Czech', flagEmoji: '🇨🇿', phoneCode: '+420', currency: 'CZK', timezone: 'Europe/Prague' },
  { name: 'Denmark', alpha2: 'DK', alpha3: 'DNK', nationality: 'Danish', flagEmoji: '🇩🇰', phoneCode: '+45', currency: 'DKK', timezone: 'Europe/Copenhagen' },
  { name: 'Djibouti', alpha2: 'DJ', alpha3: 'DJI', nationality: 'Djiboutian', flagEmoji: '🇩🇯', phoneCode: '+253', currency: 'DJF', timezone: 'Africa/Djibouti' },
  { name: 'Dominica', alpha2: 'DM', alpha3: 'DMA', nationality: 'Dominican', flagEmoji: '🇩🇲', phoneCode: '+1-767', currency: 'XCD', timezone: 'America/Dominica' },
  { name: 'Dominican Republic', alpha2: 'DO', alpha3: 'DOM', nationality: 'Dominican', flagEmoji: '🇩🇴', phoneCode: '+1-809', currency: 'DOP', timezone: 'America/Santo_Domingo' },
  { name: 'Ecuador', alpha2: 'EC', alpha3: 'ECU', nationality: 'Ecuadorian', flagEmoji: '🇪🇨', phoneCode: '+593', currency: 'USD', timezone: 'America/Guayaquil' },
  { name: 'Egypt', alpha2: 'EG', alpha3: 'EGY', nationality: 'Egyptian', flagEmoji: '🇪🇬', phoneCode: '+20', currency: 'EGP', timezone: 'Africa/Cairo' },
  { name: 'El Salvador', alpha2: 'SV', alpha3: 'SLV', nationality: 'Salvadoran', flagEmoji: '🇸🇻', phoneCode: '+503', currency: 'USD', timezone: 'America/El_Salvador' },
  { name: 'Equatorial Guinea', alpha2: 'GQ', alpha3: 'GNQ', nationality: 'Equatoguinean', flagEmoji: '🇬🇶', phoneCode: '+240', currency: 'XAF', timezone: 'Africa/Malabo' },
  { name: 'Eritrea', alpha2: 'ER', alpha3: 'ERI', nationality: 'Eritrean', flagEmoji: '🇪🇷', phoneCode: '+291', currency: 'ERN', timezone: 'Africa/Asmara' },
  { name: 'Estonia', alpha2: 'EE', alpha3: 'EST', nationality: 'Estonian', flagEmoji: '🇪🇪', phoneCode: '+372', currency: 'EUR', timezone: 'Europe/Tallinn' },
  { name: 'Eswatini', alpha2: 'SZ', alpha3: 'SWZ', nationality: 'Swazi', flagEmoji: '🇸🇿', phoneCode: '+268', currency: 'SZL', timezone: 'Africa/Mbabane' },
  { name: 'Ethiopia', alpha2: 'ET', alpha3: 'ETH', nationality: 'Ethiopian', flagEmoji: '🇪🇹', phoneCode: '+251', currency: 'ETB', timezone: 'Africa/Addis_Ababa' },
  { name: 'Fiji', alpha2: 'FJ', alpha3: 'FJI', nationality: 'Fijian', flagEmoji: '🇫🇯', phoneCode: '+679', currency: 'FJD', timezone: 'Pacific/Fiji' },
  { name: 'Finland', alpha2: 'FI', alpha3: 'FIN', nationality: 'Finnish', flagEmoji: '🇫🇮', phoneCode: '+358', currency: 'EUR', timezone: 'Europe/Helsinki' },
  { name: 'France', alpha2: 'FR', alpha3: 'FRA', nationality: 'French', flagEmoji: '🇫🇷', phoneCode: '+33', currency: 'EUR', timezone: 'Europe/Paris' },
  { name: 'Gabon', alpha2: 'GA', alpha3: 'GAB', nationality: 'Gabonese', flagEmoji: '🇬🇦', phoneCode: '+241', currency: 'XAF', timezone: 'Africa/Libreville' },
  { name: 'Gambia', alpha2: 'GM', alpha3: 'GMB', nationality: 'Gambian', flagEmoji: '🇬🇲', phoneCode: '+220', currency: 'GMD', timezone: 'Africa/Banjul' },
  { name: 'Georgia', alpha2: 'GE', alpha3: 'GEO', nationality: 'Georgian', flagEmoji: '🇬🇪', phoneCode: '+995', currency: 'GEL', timezone: 'Asia/Tbilisi' },
  { name: 'Germany', alpha2: 'DE', alpha3: 'DEU', nationality: 'German', flagEmoji: '🇩🇪', phoneCode: '+49', currency: 'EUR', timezone: 'Europe/Berlin' },
  { name: 'Ghana', alpha2: 'GH', alpha3: 'GHA', nationality: 'Ghanaian', flagEmoji: '🇬🇭', phoneCode: '+233', currency: 'GHS', timezone: 'Africa/Accra' },
  { name: 'Greece', alpha2: 'GR', alpha3: 'GRC', nationality: 'Greek', flagEmoji: '🇬🇷', phoneCode: '+30', currency: 'EUR', timezone: 'Europe/Athens' },
  { name: 'Grenada', alpha2: 'GD', alpha3: 'GRD', nationality: 'Grenadian', flagEmoji: '🇬🇩', phoneCode: '+1-473', currency: 'XCD', timezone: 'America/Grenada' },
  { name: 'Guatemala', alpha2: 'GT', alpha3: 'GTM', nationality: 'Guatemalan', flagEmoji: '🇬🇹', phoneCode: '+502', currency: 'GTQ', timezone: 'America/Guatemala' },
  { name: 'Guinea', alpha2: 'GN', alpha3: 'GIN', nationality: 'Guinean', flagEmoji: '🇬🇳', phoneCode: '+224', currency: 'GNF', timezone: 'Africa/Conakry' },
  { name: 'Guinea-Bissau', alpha2: 'GW', alpha3: 'GNB', nationality: 'Bissau-Guinean', flagEmoji: '🇬🇼', phoneCode: '+245', currency: 'XOF', timezone: 'Africa/Bissau' },
  { name: 'Guyana', alpha2: 'GY', alpha3: 'GUY', nationality: 'Guyanese', flagEmoji: '🇬🇾', phoneCode: '+592', currency: 'GYD', timezone: 'America/Guyana' },
  { name: 'Haiti', alpha2: 'HT', alpha3: 'HTI', nationality: 'Haitian', flagEmoji: '🇭🇹', phoneCode: '+509', currency: 'HTG', timezone: 'America/Port-au-Prince' },
  { name: 'Honduras', alpha2: 'HN', alpha3: 'HND', nationality: 'Honduran', flagEmoji: '🇭🇳', phoneCode: '+504', currency: 'HNL', timezone: 'America/Tegucigalpa' },
  { name: 'Hungary', alpha2: 'HU', alpha3: 'HUN', nationality: 'Hungarian', flagEmoji: '🇭🇺', phoneCode: '+36', currency: 'HUF', timezone: 'Europe/Budapest' },
  { name: 'Iceland', alpha2: 'IS', alpha3: 'ISL', nationality: 'Icelandic', flagEmoji: '🇮🇸', phoneCode: '+354', currency: 'ISK', timezone: 'Atlantic/Reykjavik' },
  { name: 'India', alpha2: 'IN', alpha3: 'IND', nationality: 'Indian', flagEmoji: '🇮🇳', phoneCode: '+91', currency: 'INR', timezone: 'Asia/Kolkata' },
  { name: 'Indonesia', alpha2: 'ID', alpha3: 'IDN', nationality: 'Indonesian', flagEmoji: '🇮🇩', phoneCode: '+62', currency: 'IDR', timezone: 'Asia/Jakarta' },
  { name: 'Iran', alpha2: 'IR', alpha3: 'IRN', nationality: 'Iranian', flagEmoji: '🇮🇷', phoneCode: '+98', currency: 'IRR', timezone: 'Asia/Tehran' },
  { name: 'Iraq', alpha2: 'IQ', alpha3: 'IRQ', nationality: 'Iraqi', flagEmoji: '🇮🇶', phoneCode: '+964', currency: 'IQD', timezone: 'Asia/Baghdad' },
  { name: 'Ireland', alpha2: 'IE', alpha3: 'IRL', nationality: 'Irish', flagEmoji: '🇮🇪', phoneCode: '+353', currency: 'EUR', timezone: 'Europe/Dublin' },
  { name: 'Israel', alpha2: 'IL', alpha3: 'ISR', nationality: 'Israeli', flagEmoji: '🇮🇱', phoneCode: '+972', currency: 'ILS', timezone: 'Asia/Jerusalem' },
  { name: 'Italy', alpha2: 'IT', alpha3: 'ITA', nationality: 'Italian', flagEmoji: '🇮🇹', phoneCode: '+39', currency: 'EUR', timezone: 'Europe/Rome' },
  { name: 'Jamaica', alpha2: 'JM', alpha3: 'JAM', nationality: 'Jamaican', flagEmoji: '🇯🇲', phoneCode: '+1-876', currency: 'JMD', timezone: 'America/Jamaica' },
  { name: 'Japan', alpha2: 'JP', alpha3: 'JPN', nationality: 'Japanese', flagEmoji: '🇯🇵', phoneCode: '+81', currency: 'JPY', timezone: 'Asia/Tokyo' },
  { name: 'Jordan', alpha2: 'JO', alpha3: 'JOR', nationality: 'Jordanian', flagEmoji: '🇯🇴', phoneCode: '+962', currency: 'JOD', timezone: 'Asia/Amman' },
  { name: 'Kazakhstan', alpha2: 'KZ', alpha3: 'KAZ', nationality: 'Kazakhstani', flagEmoji: '🇰🇿', phoneCode: '+7', currency: 'KZT', timezone: 'Asia/Almaty' },
  { name: 'Kenya', alpha2: 'KE', alpha3: 'KEN', nationality: 'Kenyan', flagEmoji: '🇰🇪', phoneCode: '+254', currency: 'KES', timezone: 'Africa/Nairobi' },
  { name: 'Kiribati', alpha2: 'KI', alpha3: 'KIR', nationality: 'I-Kiribati', flagEmoji: '🇰🇮', phoneCode: '+686', currency: 'AUD', timezone: 'Pacific/Tarawa' },
  { name: 'Kuwait', alpha2: 'KW', alpha3: 'KWT', nationality: 'Kuwaiti', flagEmoji: '🇰🇼', phoneCode: '+965', currency: 'KWD', timezone: 'Asia/Kuwait' },
  { name: 'Kyrgyzstan', alpha2: 'KG', alpha3: 'KGZ', nationality: 'Kyrgyz', flagEmoji: '🇰🇬', phoneCode: '+996', currency: 'KGS', timezone: 'Asia/Bishkek' },
  { name: 'Laos', alpha2: 'LA', alpha3: 'LAO', nationality: 'Lao', flagEmoji: '🇱🇦', phoneCode: '+856', currency: 'LAK', timezone: 'Asia/Vientiane' },
  { name: 'Latvia', alpha2: 'LV', alpha3: 'LVA', nationality: 'Latvian', flagEmoji: '🇱🇻', phoneCode: '+371', currency: 'EUR', timezone: 'Europe/Riga' },
  { name: 'Lebanon', alpha2: 'LB', alpha3: 'LBN', nationality: 'Lebanese', flagEmoji: '🇱🇧', phoneCode: '+961', currency: 'LBP', timezone: 'Asia/Beirut' },
  { name: 'Lesotho', alpha2: 'LS', alpha3: 'LSO', nationality: 'Mosotho', flagEmoji: '🇱🇸', phoneCode: '+266', currency: 'LSL', timezone: 'Africa/Maseru' },
  { name: 'Liberia', alpha2: 'LR', alpha3: 'LBR', nationality: 'Liberian', flagEmoji: '🇱🇷', phoneCode: '+231', currency: 'LRD', timezone: 'Africa/Monrovia' },
  { name: 'Libya', alpha2: 'LY', alpha3: 'LBY', nationality: 'Libyan', flagEmoji: '🇱🇾', phoneCode: '+218', currency: 'LYD', timezone: 'Africa/Tripoli' },
  { name: 'Liechtenstein', alpha2: 'LI', alpha3: 'LIE', nationality: 'Liechtensteiner', flagEmoji: '🇱🇮', phoneCode: '+423', currency: 'CHF', timezone: 'Europe/Vaduz' },
  { name: 'Lithuania', alpha2: 'LT', alpha3: 'LTU', nationality: 'Lithuanian', flagEmoji: '🇱🇹', phoneCode: '+370', currency: 'EUR', timezone: 'Europe/Vilnius' },
  { name: 'Luxembourg', alpha2: 'LU', alpha3: 'LUX', nationality: 'Luxembourgish', flagEmoji: '🇱🇺', phoneCode: '+352', currency: 'EUR', timezone: 'Europe/Luxembourg' },
  { name: 'Madagascar', alpha2: 'MG', alpha3: 'MDG', nationality: 'Malagasy', flagEmoji: '🇲🇬', phoneCode: '+261', currency: 'MGA', timezone: 'Indian/Antananarivo' },
  { name: 'Malawi', alpha2: 'MW', alpha3: 'MWI', nationality: 'Malawian', flagEmoji: '🇲🇼', phoneCode: '+265', currency: 'MWK', timezone: 'Africa/Lilongwe' },
  { name: 'Malaysia', alpha2: 'MY', alpha3: 'MYS', nationality: 'Malaysian', flagEmoji: '🇲🇾', phoneCode: '+60', currency: 'MYR', timezone: 'Asia/Kuala_Lumpur' },
  { name: 'Maldives', alpha2: 'MV', alpha3: 'MDV', nationality: 'Maldivian', flagEmoji: '🇲🇻', phoneCode: '+960', currency: 'MVR', timezone: 'Indian/Maldives' },
  { name: 'Mali', alpha2: 'ML', alpha3: 'MLI', nationality: 'Malian', flagEmoji: '🇲🇱', phoneCode: '+223', currency: 'XOF', timezone: 'Africa/Bamako' },
  { name: 'Malta', alpha2: 'MT', alpha3: 'MLT', nationality: 'Maltese', flagEmoji: '🇲🇹', phoneCode: '+356', currency: 'EUR', timezone: 'Europe/Malta' },
  { name: 'Marshall Islands', alpha2: 'MH', alpha3: 'MHL', nationality: 'Marshallese', flagEmoji: '🇲🇭', phoneCode: '+692', currency: 'USD', timezone: 'Pacific/Majuro' },
  { name: 'Mauritania', alpha2: 'MR', alpha3: 'MRT', nationality: 'Mauritanian', flagEmoji: '🇲🇷', phoneCode: '+222', currency: 'MRU', timezone: 'Africa/Nouakchott' },
  { name: 'Mauritius', alpha2: 'MU', alpha3: 'MUS', nationality: 'Mauritian', flagEmoji: '🇲🇺', phoneCode: '+230', currency: 'MUR', timezone: 'Indian/Mauritius' },
  { name: 'Mexico', alpha2: 'MX', alpha3: 'MEX', nationality: 'Mexican', flagEmoji: '🇲🇽', phoneCode: '+52', currency: 'MXN', timezone: 'America/Mexico_City' },
  { name: 'Micronesia', alpha2: 'FM', alpha3: 'FSM', nationality: 'Micronesian', flagEmoji: '🇫🇲', phoneCode: '+691', currency: 'USD', timezone: 'Pacific/Chuuk' },
  { name: 'Moldova', alpha2: 'MD', alpha3: 'MDA', nationality: 'Moldovan', flagEmoji: '🇲🇩', phoneCode: '+373', currency: 'MDL', timezone: 'Europe/Chisinau' },
  { name: 'Monaco', alpha2: 'MC', alpha3: 'MCO', nationality: 'Monacan', flagEmoji: '🇲🇨', phoneCode: '+377', currency: 'EUR', timezone: 'Europe/Monaco' },
  { name: 'Mongolia', alpha2: 'MN', alpha3: 'MNG', nationality: 'Mongolian', flagEmoji: '🇲🇳', phoneCode: '+976', currency: 'MNT', timezone: 'Asia/Ulaanbaatar' },
  { name: 'Montenegro', alpha2: 'ME', alpha3: 'MNE', nationality: 'Montenegrin', flagEmoji: '🇲🇪', phoneCode: '+382', currency: 'EUR', timezone: 'Europe/Podgorica' },
  { name: 'Morocco', alpha2: 'MA', alpha3: 'MAR', nationality: 'Moroccan', flagEmoji: '🇲🇦', phoneCode: '+212', currency: 'MAD', timezone: 'Africa/Casablanca' },
  { name: 'Mozambique', alpha2: 'MZ', alpha3: 'MOZ', nationality: 'Mozambican', flagEmoji: '🇲🇿', phoneCode: '+258', currency: 'MZN', timezone: 'Africa/Maputo' },
  { name: 'Myanmar', alpha2: 'MM', alpha3: 'MMR', nationality: 'Burmese', flagEmoji: '🇲🇲', phoneCode: '+95', currency: 'MMK', timezone: 'Asia/Yangon' },
  { name: 'Namibia', alpha2: 'NA', alpha3: 'NAM', nationality: 'Namibian', flagEmoji: '🇳🇦', phoneCode: '+264', currency: 'NAD', timezone: 'Africa/Windhoek' },
  { name: 'Nauru', alpha2: 'NR', alpha3: 'NRU', nationality: 'Nauruan', flagEmoji: '🇳🇷', phoneCode: '+674', currency: 'AUD', timezone: 'Pacific/Nauru' },
  { name: 'Nepal', alpha2: 'NP', alpha3: 'NPL', nationality: 'Nepali', flagEmoji: '🇳🇵', phoneCode: '+977', currency: 'NPR', timezone: 'Asia/Kathmandu' },
  { name: 'Netherlands', alpha2: 'NL', alpha3: 'NLD', nationality: 'Dutch', flagEmoji: '🇳🇱', phoneCode: '+31', currency: 'EUR', timezone: 'Europe/Amsterdam' },
  { name: 'New Zealand', alpha2: 'NZ', alpha3: 'NZL', nationality: 'New Zealander', flagEmoji: '🇳🇿', phoneCode: '+64', currency: 'NZD', timezone: 'Pacific/Auckland' },
  { name: 'Nicaragua', alpha2: 'NI', alpha3: 'NIC', nationality: 'Nicaraguan', flagEmoji: '🇳🇮', phoneCode: '+505', currency: 'NIO', timezone: 'America/Managua' },
  { name: 'Niger', alpha2: 'NE', alpha3: 'NER', nationality: 'Nigerien', flagEmoji: '🇳🇪', phoneCode: '+227', currency: 'XOF', timezone: 'Africa/Niamey' },
  { name: 'Nigeria', alpha2: 'NG', alpha3: 'NGA', nationality: 'Nigerian', flagEmoji: '🇳🇬', phoneCode: '+234', currency: 'NGN', timezone: 'Africa/Lagos' },
  { name: 'North Korea', alpha2: 'KP', alpha3: 'PRK', nationality: 'North Korean', flagEmoji: '🇰🇵', phoneCode: '+850', currency: 'KPW', timezone: 'Asia/Pyongyang' },
  { name: 'North Macedonia', alpha2: 'MK', alpha3: 'MKD', nationality: 'Macedonian', flagEmoji: '🇲🇰', phoneCode: '+389', currency: 'MKD', timezone: 'Europe/Skopje' },
  { name: 'Norway', alpha2: 'NO', alpha3: 'NOR', nationality: 'Norwegian', flagEmoji: '🇳🇴', phoneCode: '+47', currency: 'NOK', timezone: 'Europe/Oslo' },
  { name: 'Oman', alpha2: 'OM', alpha3: 'OMN', nationality: 'Omani', flagEmoji: '🇴🇲', phoneCode: '+968', currency: 'OMR', timezone: 'Asia/Muscat' },
  { name: 'Pakistan', alpha2: 'PK', alpha3: 'PAK', nationality: 'Pakistani', flagEmoji: '🇵🇰', phoneCode: '+92', currency: 'PKR', timezone: 'Asia/Karachi' },
  { name: 'Palau', alpha2: 'PW', alpha3: 'PLW', nationality: 'Palauan', flagEmoji: '🇵🇼', phoneCode: '+680', currency: 'USD', timezone: 'Pacific/Palau' },
  { name: 'Palestine', alpha2: 'PS', alpha3: 'PSE', nationality: 'Palestinian', flagEmoji: '🇵🇸', phoneCode: '+970', currency: 'ILS', timezone: 'Asia/Gaza' },
  { name: 'Panama', alpha2: 'PA', alpha3: 'PAN', nationality: 'Panamanian', flagEmoji: '🇵🇦', phoneCode: '+507', currency: 'PAB', timezone: 'America/Panama' },
  { name: 'Papua New Guinea', alpha2: 'PG', alpha3: 'PNG', nationality: 'Papua New Guinean', flagEmoji: '🇵🇬', phoneCode: '+675', currency: 'PGK', timezone: 'Pacific/Port_Moresby' },
  { name: 'Paraguay', alpha2: 'PY', alpha3: 'PRY', nationality: 'Paraguayan', flagEmoji: '🇵🇾', phoneCode: '+595', currency: 'PYG', timezone: 'America/Asuncion' },
  { name: 'Peru', alpha2: 'PE', alpha3: 'PER', nationality: 'Peruvian', flagEmoji: '🇵🇪', phoneCode: '+51', currency: 'PEN', timezone: 'America/Lima' },
  { name: 'Philippines', alpha2: 'PH', alpha3: 'PHL', nationality: 'Filipino', flagEmoji: '🇵🇭', phoneCode: '+63', currency: 'PHP', timezone: 'Asia/Manila' },
  { name: 'Poland', alpha2: 'PL', alpha3: 'POL', nationality: 'Polish', flagEmoji: '🇵🇱', phoneCode: '+48', currency: 'PLN', timezone: 'Europe/Warsaw' },
  { name: 'Portugal', alpha2: 'PT', alpha3: 'PRT', nationality: 'Portuguese', flagEmoji: '🇵🇹', phoneCode: '+351', currency: 'EUR', timezone: 'Europe/Lisbon' },
  { name: 'Qatar', alpha2: 'QA', alpha3: 'QAT', nationality: 'Qatari', flagEmoji: '🇶🇦', phoneCode: '+974', currency: 'QAR', timezone: 'Asia/Qatar' },
  { name: 'Romania', alpha2: 'RO', alpha3: 'ROU', nationality: 'Romanian', flagEmoji: '🇷🇴', phoneCode: '+40', currency: 'RON', timezone: 'Europe/Bucharest' },
  { name: 'Russia', alpha2: 'RU', alpha3: 'RUS', nationality: 'Russian', flagEmoji: '🇷🇺', phoneCode: '+7', currency: 'RUB', timezone: 'Europe/Moscow' },
  { name: 'Rwanda', alpha2: 'RW', alpha3: 'RWA', nationality: 'Rwandan', flagEmoji: '🇷🇼', phoneCode: '+250', currency: 'RWF', timezone: 'Africa/Kigali' },
  { name: 'Saint Kitts and Nevis', alpha2: 'KN', alpha3: 'KNA', nationality: 'Kittitian', flagEmoji: '🇰🇳', phoneCode: '+1-869', currency: 'XCD', timezone: 'America/St_Kitts' },
  { name: 'Saint Lucia', alpha2: 'LC', alpha3: 'LCA', nationality: 'Saint Lucian', flagEmoji: '🇱🇨', phoneCode: '+1-758', currency: 'XCD', timezone: 'America/St_Lucia' },
  { name: 'Saint Vincent and the Grenadines', alpha2: 'VC', alpha3: 'VCT', nationality: 'Vincentian', flagEmoji: '🇻🇨', phoneCode: '+1-784', currency: 'XCD', timezone: 'America/St_Vincent' },
  { name: 'Samoa', alpha2: 'WS', alpha3: 'WSM', nationality: 'Samoan', flagEmoji: '🇼🇸', phoneCode: '+685', currency: 'WST', timezone: 'Pacific/Apia' },
  { name: 'San Marino', alpha2: 'SM', alpha3: 'SMR', nationality: 'Sammarinese', flagEmoji: '🇸🇲', phoneCode: '+378', currency: 'EUR', timezone: 'Europe/San_Marino' },
  { name: 'Sao Tome and Principe', alpha2: 'ST', alpha3: 'STP', nationality: 'Sao Tomean', flagEmoji: '🇸🇹', phoneCode: '+239', currency: 'STN', timezone: 'Africa/Sao_Tome' },
  { name: 'Saudi Arabia', alpha2: 'SA', alpha3: 'SAU', nationality: 'Saudi', flagEmoji: '🇸🇦', phoneCode: '+966', currency: 'SAR', timezone: 'Asia/Riyadh' },
  { name: 'Senegal', alpha2: 'SN', alpha3: 'SEN', nationality: 'Senegalese', flagEmoji: '🇸🇳', phoneCode: '+221', currency: 'XOF', timezone: 'Africa/Dakar' },
  { name: 'Serbia', alpha2: 'RS', alpha3: 'SRB', nationality: 'Serbian', flagEmoji: '🇷🇸', phoneCode: '+381', currency: 'RSD', timezone: 'Europe/Belgrade' },
  { name: 'Seychelles', alpha2: 'SC', alpha3: 'SYC', nationality: 'Seychellois', flagEmoji: '🇸🇨', phoneCode: '+248', currency: 'SCR', timezone: 'Indian/Mahe' },
  { name: 'Sierra Leone', alpha2: 'SL', alpha3: 'SLE', nationality: 'Sierra Leonean', flagEmoji: '🇸🇱', phoneCode: '+232', currency: 'SLL', timezone: 'Africa/Freetown' },
  { name: 'Singapore', alpha2: 'SG', alpha3: 'SGP', nationality: 'Singaporean', flagEmoji: '🇸🇬', phoneCode: '+65', currency: 'SGD', timezone: 'Asia/Singapore' },
  { name: 'Slovakia', alpha2: 'SK', alpha3: 'SVK', nationality: 'Slovak', flagEmoji: '🇸🇰', phoneCode: '+421', currency: 'EUR', timezone: 'Europe/Bratislava' },
  { name: 'Slovenia', alpha2: 'SI', alpha3: 'SVN', nationality: 'Slovenian', flagEmoji: '🇸🇮', phoneCode: '+386', currency: 'EUR', timezone: 'Europe/Ljubljana' },
  { name: 'Solomon Islands', alpha2: 'SB', alpha3: 'SLB', nationality: 'Solomon Islander', flagEmoji: '🇸🇧', phoneCode: '+677', currency: 'SBD', timezone: 'Pacific/Guadalcanal' },
  { name: 'Somalia', alpha2: 'SO', alpha3: 'SOM', nationality: 'Somali', flagEmoji: '🇸🇴', phoneCode: '+252', currency: 'SOS', timezone: 'Africa/Mogadishu' },
  { name: 'South Africa', alpha2: 'ZA', alpha3: 'ZAF', nationality: 'South African', flagEmoji: '🇿🇦', phoneCode: '+27', currency: 'ZAR', timezone: 'Africa/Johannesburg' },
  { name: 'South Korea', alpha2: 'KR', alpha3: 'KOR', nationality: 'South Korean', flagEmoji: '🇰🇷', phoneCode: '+82', currency: 'KRW', timezone: 'Asia/Seoul' },
  { name: 'South Sudan', alpha2: 'SS', alpha3: 'SSD', nationality: 'South Sudanese', flagEmoji: '🇸🇸', phoneCode: '+211', currency: 'SSP', timezone: 'Africa/Juba' },
  { name: 'Spain', alpha2: 'ES', alpha3: 'ESP', nationality: 'Spanish', flagEmoji: '🇪🇸', phoneCode: '+34', currency: 'EUR', timezone: 'Europe/Madrid' },
  { name: 'Sri Lanka', alpha2: 'LK', alpha3: 'LKA', nationality: 'Sri Lankan', flagEmoji: '🇱🇰', phoneCode: '+94', currency: 'LKR', timezone: 'Asia/Colombo' },
  { name: 'Sudan', alpha2: 'SD', alpha3: 'SDN', nationality: 'Sudanese', flagEmoji: '🇸🇩', phoneCode: '+249', currency: 'SDG', timezone: 'Africa/Khartoum' },
  { name: 'Suriname', alpha2: 'SR', alpha3: 'SUR', nationality: 'Surinamese', flagEmoji: '🇸🇷', phoneCode: '+597', currency: 'SRD', timezone: 'America/Paramaribo' },
  { name: 'Sweden', alpha2: 'SE', alpha3: 'SWE', nationality: 'Swedish', flagEmoji: '🇸🇪', phoneCode: '+46', currency: 'SEK', timezone: 'Europe/Stockholm' },
  { name: 'Switzerland', alpha2: 'CH', alpha3: 'CHE', nationality: 'Swiss', flagEmoji: '🇨🇭', phoneCode: '+41', currency: 'CHF', timezone: 'Europe/Zurich' },
  { name: 'Syria', alpha2: 'SY', alpha3: 'SYR', nationality: 'Syrian', flagEmoji: '🇸🇾', phoneCode: '+963', currency: 'SYP', timezone: 'Asia/Damascus' },
  { name: 'Tajikistan', alpha2: 'TJ', alpha3: 'TJK', nationality: 'Tajik', flagEmoji: '🇹🇯', phoneCode: '+992', currency: 'TJS', timezone: 'Asia/Dushanbe' },
  { name: 'Tanzania', alpha2: 'TZ', alpha3: 'TZA', nationality: 'Tanzanian', flagEmoji: '🇹🇿', phoneCode: '+255', currency: 'TZS', timezone: 'Africa/Dar_es_Salaam' },
  { name: 'Thailand', alpha2: 'TH', alpha3: 'THA', nationality: 'Thai', flagEmoji: '🇹🇭', phoneCode: '+66', currency: 'THB', timezone: 'Asia/Bangkok' },
  { name: 'Timor-Leste', alpha2: 'TL', alpha3: 'TLS', nationality: 'Timorese', flagEmoji: '🇹🇱', phoneCode: '+670', currency: 'USD', timezone: 'Asia/Dili' },
  { name: 'Togo', alpha2: 'TG', alpha3: 'TGO', nationality: 'Togolese', flagEmoji: '🇹🇬', phoneCode: '+228', currency: 'XOF', timezone: 'Africa/Lome' },
  { name: 'Tonga', alpha2: 'TO', alpha3: 'TON', nationality: 'Tongan', flagEmoji: '🇹🇴', phoneCode: '+676', currency: 'TOP', timezone: 'Pacific/Tongatapu' },
  { name: 'Trinidad and Tobago', alpha2: 'TT', alpha3: 'TTO', nationality: 'Trinidadian', flagEmoji: '🇹🇹', phoneCode: '+1-868', currency: 'TTD', timezone: 'America/Port_of_Spain' },
  { name: 'Tunisia', alpha2: 'TN', alpha3: 'TUN', nationality: 'Tunisian', flagEmoji: '🇹🇳', phoneCode: '+216', currency: 'TND', timezone: 'Africa/Tunis' },
  { name: 'Turkey', alpha2: 'TR', alpha3: 'TUR', nationality: 'Turkish', flagEmoji: '🇹🇷', phoneCode: '+90', currency: 'TRY', timezone: 'Europe/Istanbul' },
  { name: 'Turkmenistan', alpha2: 'TM', alpha3: 'TKM', nationality: 'Turkmen', flagEmoji: '🇹🇲', phoneCode: '+993', currency: 'TMT', timezone: 'Asia/Ashgabat' },
  { name: 'Tuvalu', alpha2: 'TV', alpha3: 'TUV', nationality: 'Tuvaluan', flagEmoji: '🇹🇻', phoneCode: '+688', currency: 'AUD', timezone: 'Pacific/Funafuti' },
  { name: 'Uganda', alpha2: 'UG', alpha3: 'UGA', nationality: 'Ugandan', flagEmoji: '🇺🇬', phoneCode: '+256', currency: 'UGX', timezone: 'Africa/Kampala' },
  { name: 'Ukraine', alpha2: 'UA', alpha3: 'UKR', nationality: 'Ukrainian', flagEmoji: '🇺🇦', phoneCode: '+380', currency: 'UAH', timezone: 'Europe/Kyiv' },
  { name: 'United Arab Emirates', alpha2: 'AE', alpha3: 'ARE', nationality: 'Emirati', flagEmoji: '🇦🇪', phoneCode: '+971', currency: 'AED', timezone: 'Asia/Dubai' },
  { name: 'United Kingdom', alpha2: 'GB', alpha3: 'GBR', nationality: 'British', flagEmoji: '🇬🇧', phoneCode: '+44', currency: 'GBP', timezone: 'Europe/London' },
  { name: 'United States', alpha2: 'US', alpha3: 'USA', nationality: 'American', flagEmoji: '🇺🇸', phoneCode: '+1', currency: 'USD', timezone: 'America/New_York' },
  { name: 'Uruguay', alpha2: 'UY', alpha3: 'URY', nationality: 'Uruguayan', flagEmoji: '🇺🇾', phoneCode: '+598', currency: 'UYU', timezone: 'America/Montevideo' },
  { name: 'Uzbekistan', alpha2: 'UZ', alpha3: 'UZB', nationality: 'Uzbek', flagEmoji: '🇺🇿', phoneCode: '+998', currency: 'UZS', timezone: 'Asia/Tashkent' },
  { name: 'Vanuatu', alpha2: 'VU', alpha3: 'VUT', nationality: 'Ni-Vanuatu', flagEmoji: '🇻🇺', phoneCode: '+678', currency: 'VUV', timezone: 'Pacific/Efate' },
  { name: 'Vatican City', alpha2: 'VA', alpha3: 'VAT', nationality: 'Vatican', flagEmoji: '🇻🇦', phoneCode: '+39', currency: 'EUR', timezone: 'Europe/Vatican' },
  { name: 'Venezuela', alpha2: 'VE', alpha3: 'VEN', nationality: 'Venezuelan', flagEmoji: '🇻🇪', phoneCode: '+58', currency: 'VES', timezone: 'America/Caracas' },
  { name: 'Vietnam', alpha2: 'VN', alpha3: 'VNM', nationality: 'Vietnamese', flagEmoji: '🇻🇳', phoneCode: '+84', currency: 'VND', timezone: 'Asia/Ho_Chi_Minh' },
  { name: 'Yemen', alpha2: 'YE', alpha3: 'YEM', nationality: 'Yemeni', flagEmoji: '🇾🇪', phoneCode: '+967', currency: 'YER', timezone: 'Asia/Aden' },
  { name: 'Zambia', alpha2: 'ZM', alpha3: 'ZMB', nationality: 'Zambian', flagEmoji: '🇿🇲', phoneCode: '+260', currency: 'ZMW', timezone: 'Africa/Lusaka' },
  { name: 'Zimbabwe', alpha2: 'ZW', alpha3: 'ZWE', nationality: 'Zimbabwean', flagEmoji: '🇿🇼', phoneCode: '+263', currency: 'ZWL', timezone: 'Africa/Harare' }
];

const visaTypes = [
  { name: 'Tourist Visa', code: 'TV', description: 'For tourism and holidays', processingDays: 14, fee: 100 },
  { name: 'Business Visa', code: 'BV', description: 'For business meetings and conferences', processingDays: 7, fee: 200 },
  { name: 'Student Visa', code: 'SV', description: 'For academic studies', processingDays: 30, fee: 150 },
  { name: 'Work Visa', code: 'WV', description: 'For employment', processingDays: 45, fee: 250 },
  { name: 'Transit Visa', code: 'TR', description: 'For layovers and connecting flights', processingDays: 3, fee: 50 },
  { name: 'Medical Visa', code: 'MV', description: 'For medical treatment', processingDays: 10, fee: 175 },
  { name: 'Diplomatic Visa', code: 'DV', description: 'For government officials', processingDays: 5, fee: 0 },
];

const settings = [
  { key: 'site_name', value: 'Immigration Management System', description: 'Name of the website' },
  { key: 'maintenance_mode', value: 'false', description: 'Enable maintenance mode' },
  { key: 'max_upload_size', value: '5242880', description: 'Max file upload size in bytes (5MB)' },
  { key: 'allowed_file_types', value: 'pdf,jpg,jpeg,png', description: 'Allowed file extensions' },
  { key: 'session_timeout', value: '3600', description: 'Session timeout in seconds' },
  { key: 'email_notifications', value: 'true', description: 'Enable email notifications' }
];

async function main() {
  console.log('Starting seed...');

  // 1. Seed Countries
  console.log('Seeding countries...');
  for (const country of countries) {
    await prisma.country.upsert({
      where: { alpha2: country.alpha2 },
      update: country,
      create: country,
    });
  }

  // 2. Seed Visa Types and Required Documents
  console.log('Seeding visa types...');
  for (const visaType of visaTypes) {
    const createdVisaType = await prisma.visaType.upsert({
      where: { code: visaType.code },
      update: visaType,
      create: visaType,
    });

    // Basic required docs for all
    const commonDocs = [
      { name: 'Passport Copy', description: 'Clear copy of passport data page', isMandatory: true },
      { name: 'Recent Photograph', description: 'Passport size photograph (white background)', isMandatory: true }
    ];

    for (const doc of commonDocs) {
      const existingDoc = await prisma.requiredDocument.findFirst({
        where: { visaTypeId: createdVisaType.id, name: doc.name }
      });
      if (!existingDoc) {
        await prisma.requiredDocument.create({
          data: { ...doc, visaTypeId: createdVisaType.id }
        });
      }
    }
    
    // Specific docs based on type
    if (visaType.code === 'BV') {
      const existingDoc = await prisma.requiredDocument.findFirst({ where: { visaTypeId: createdVisaType.id, name: 'Invitation Letter' } });
      if (!existingDoc) await prisma.requiredDocument.create({ data: { name: 'Invitation Letter', description: 'From host company', isMandatory: true, visaTypeId: createdVisaType.id } });
    }
    if (visaType.code === 'SV') {
      const existingDoc = await prisma.requiredDocument.findFirst({ where: { visaTypeId: createdVisaType.id, name: 'Admission Letter' } });
      if (!existingDoc) await prisma.requiredDocument.create({ data: { name: 'Admission Letter', description: 'From university/school', isMandatory: true, visaTypeId: createdVisaType.id } });
    }
    if (visaType.code === 'WV') {
      const existingDoc = await prisma.requiredDocument.findFirst({ where: { visaTypeId: createdVisaType.id, name: 'Employment Contract' } });
      if (!existingDoc) await prisma.requiredDocument.create({ data: { name: 'Employment Contract', description: 'Signed contract', isMandatory: true, visaTypeId: createdVisaType.id } });
    }
  }

  // 3. Seed System Settings
  console.log('Seeding settings...');
  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }

  // 4. Seed Default Admin
  console.log('Seeding default users...');
  const adminPasswordHash = await bcrypt.hash('Admin@123456', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@immigration.gov' },
    update: {},
    create: {
      email: 'admin@immigration.gov',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      admin: {
        create: {
          firstName: 'System',
          lastName: 'Administrator',
          superAdmin: true
        }
      }
    }
  });

  // 5. Seed Default Officer
  const officerPasswordHash = await bcrypt.hash('Officer@123456', 12);
  const officerUser = await prisma.user.upsert({
    where: { email: 'officer@immigration.gov' },
    update: {},
    create: {
      email: 'officer@immigration.gov',
      passwordHash: officerPasswordHash,
      role: 'OFFICER',
      officer: {
        create: {
          firstName: 'John',
          lastName: 'Smith',
          department: 'Visa Processing',
          badgeNumber: 'OFF-001'
        }
      }
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
