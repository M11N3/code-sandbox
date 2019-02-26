cd "$(dirname "${1}")"
file="$(basename -- "$1")"

fpc "${file}"
./code
